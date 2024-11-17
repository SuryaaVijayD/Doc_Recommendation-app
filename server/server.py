from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load and clean doctor data
doctor_df = pd.read_csv(r'C:\Users\Admin\Desktop\Retina kumar doctor recommendation app\server\Dataset\modified_data.csv')
print(doctor_df.columns)
# Drop unnamed columns
doctor_df = doctor_df.loc[:, ~doctor_df.columns.str.contains('^Unnamed')]

# Ensure required columns exist
required_columns = ['id', 'Name / description', 'rating', 'Picture', 'Gender']
for col in required_columns:
    if col not in doctor_df.columns:
        raise ValueError(f"Missing required column: {col}")

# Clean the 'Name / description' field to extract doctor names and specialties
def clean_description(description):
    parts = description.split(' - ', 1)  # Split into two parts (name and specialty)
    if len(parts) == 2:
        return parts[0], parts[1]
    else:
        return parts[0], "Unknown"  # If the split doesn't work as expected, assign "Unknown" to speciality

# Apply the function to create 'doctor_name' and 'speciality' columns
doctor_df[['doctor_name', 'speciality']] = doctor_df['Name / description'].apply(lambda x: pd.Series(clean_description(x)))

# Initialize TF-IDF Vectorizer
tfidf_vectorizer = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=1, stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(doctor_df['Name / description'])

# Flask route for recommending doctors
@app.route('/recommend', methods=['POST'])
# Flask route for recommending doctors
@app.route('/recommend', methods=['POST'])
def recommend_doctors():
    data = request.get_json()

    doctor_speciality = data.get('speciality', '')
    num_recommendations = data.get('num_recommendations', 5)  # Default to 5 if not provided

    # Validate num_recommendations
    if not isinstance(num_recommendations, int) or num_recommendations <= 0:
        return jsonify({"error": "Invalid number of recommendations"}), 400

    # Filter doctors based on speciality (case-insensitive)
    relevant_doctors = doctor_df[doctor_df['speciality'].str.contains(doctor_speciality, case=False, na=False)]

    if relevant_doctors.empty:
        return jsonify({"error": f"No doctors found specializing in {doctor_speciality}."}), 404

    # Calculate cosine similarity for the filtered doctors
    tfidf_matrix_filtered = tfidf_matrix[relevant_doctors.index]
    cosine_similarities = linear_kernel(tfidf_matrix_filtered, tfidf_matrix_filtered)

    results = {}

    # Use the index of the relevant_doctors DataFrame
    for index in range(len(relevant_doctors)):
        similar_indices = cosine_similarities[index].argsort()[:-100:-1]  # Find similar doctors
        similar_items = [(cosine_similarities[index][i], relevant_doctors.iloc[i]['id']) for i in similar_indices]
        results[relevant_doctors.iloc[index]['id']] = similar_items[1:]  # Skip the doctor itself

    # Get the doctor names, images, gender, and rating based on the 'id'
    def item(doctor_id):
        doctor_row = relevant_doctors.loc[relevant_doctors['id'] == doctor_id]
        doctor_name = doctor_row['doctor_name'].tolist()[0]
        doctor_image = doctor_row['Picture'].tolist()[0] if 'Picture' in doctor_row else None
        doctor_gender = doctor_row['Gender'].tolist()[0] if 'Gender' in doctor_row else "Unknown"
        doctor_rating = doctor_row['rating'].tolist()[0] if 'rating' in doctor_row else None  # Add rating
        return doctor_name, doctor_image, doctor_gender, doctor_rating

    # Prepare recommendations
    recommendations = []
    if len(results) > 0:
        # Get the first doctor's ID
        first_doctor_id = list(results.keys())[0]

        # Get the top 'num_recommendations' doctors
        recs = results[first_doctor_id][:num_recommendations]
        for rec in recs:
            doctor_name, doctor_image, doctor_gender, doctor_rating = item(rec[1])  # Get name, image, gender, and rating
            recommendations.append({
                'doctor_id': int(rec[1]),  # Convert 'id' from int64 to Python int
                'doctor_name': doctor_name,
                'speciality': doctor_speciality,
                'doctor_image': doctor_image,  # Include the image in the recommendation
                'gender': doctor_gender,  # Include gender in the recommendation
                'rating': doctor_rating  # Include the rating in the recommendation
            })

    return jsonify({
        "recommendations": recommendations
    })


if __name__ == '__main__':
    app.run(debug=True)
