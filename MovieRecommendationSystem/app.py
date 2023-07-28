import streamlit as st
import pickle
import pandas as pd
import requests
import streamlit.components.v1 as components


def fetch_poster(movie_id):
    file=requests.get("https://api.themoviedb.org/3/movie/{}?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US".format(movie_id))
    data=file.json()
    return "https://image.tmdb.org/t/p/w500/"+ data['poster_path']


def recommend(movie):
    movie_index=int(movies[movies['title']==movie].index[0])
    distances=s[movie_index]
    movies_list=sorted(list(enumerate(distances)),reverse=True,key=lambda x: x[1])[1:6]
    recommended_movies=[]
    recommended_movies_poster=[]
    for i in movies_list:
        movie_id=movies.iloc[i[0]].id
        recommended_movies.append(movies.iloc[i[0]].title)
        #fetch poster from API..........
        recommended_movies_poster.append(fetch_poster(movie_id))
    return recommended_movies,recommended_movies_poster

movies_list=pickle.load(open('movies_dict.pkl','rb'))
movies=pd.DataFrame(movies_list)
s=pickle.load(open('similarity.pkl','rb'))
st.title('Movie Recommendation System')

seleceted_movie_name=st.selectbox(
'Enter the movie you like: ',
movies['title'].values)

if st.button('Recommend'):
    recommendations,posters=recommend(seleceted_movie_name)
    col1,col2,col3,col4,col5=st.columns(5)
    with col1:
        st.image(posters[0])
        st.text(recommendations[0])
    with col2:
        st.image(posters[1])
        st.text(recommendations[1])
    with col3:
        st.image(posters[2])
        st.text(recommendations[2])
    with col4:
        st.image(posters[3])
        st.text(recommendations[3])
    with col5:
        st.image(posters[4])
        st.text(recommendations[4])
        
        
