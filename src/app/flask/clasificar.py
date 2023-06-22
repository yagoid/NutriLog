from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sentiment_analysis_spanish import sentiment_analysis
import whisper
import logging
import pytube
import sys
import os


app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/analisis_sentimiento', methods=['POST'])
def analisis_sentimiento():
    data = request.json['data']  # Obtén los datos enviados desde Angular

    # Se realiza el análisis de sentimiento del video
    data = {'analisis_sentimiento': analizar(data)}
    return jsonify(data)



@app.route('/clasificar', methods=['POST'])
def clasificar():
    # youtubeVideoId = "https://www.youtube.com/watch?v=pvlkYYdIBV0&t=29s&pp=ygUGcmVjZXRh"

    youtubeVideoId = request.json['data']  # Obtén los datos enviados desde Angulars

    receta = trancripcion(youtubeVideoId)

    # Carga la receta desde un archivo
    # with open('src\\clasificacion\\dataset\\dataset1.txt', 'r', encoding = "ISO-8859-1") as f:
    #     receta = f.read()

    ingredientes_receta, list_ingredientes = filtrar_ingredientes(receta)
    print("Ingredientes de la receta:", str(list_ingredientes))

    prediccion = predecir_receta(ingredientes_receta)
    prediccion = prediccion[0]
    print("Esta receta es:", str(prediccion))

    dato = {'predicion': prediccion}
    return jsonify(dato)
     



def analizar(texto):
    sentiment = sentiment_analysis.SentimentAnalysisSpanish()
    score = sentiment.sentiment(texto)

    if (score > 0.5):
        return 'positivos'
    elif (score < 0.5):
        return 'negativos'
    else:
        return 'neutrales'




def predecir_receta(nueva_receta):
        path = 'src\\clasificacion'

        # El formato es ('texto', 'etiqueta')
        dataset = []

        # Guardamos en la lista las recetas sanas
        for nom_receta in (os.listdir(path+"\\sana")):
            # Leemos y cargamos el archivo de la receta
            with open('src\\clasificacion\\sana\\'+nom_receta, 'r', encoding = "ISO-8859-1") as f:
                receta = f.read()

            dataset.append((receta, 'sana'))

        # Guardamos en la lista las recetas insana
        for nom_receta in (os.listdir(path+"\\insana")):
            # Leemos y cargamos el archivo de la receta
            with open('src\\clasificacion\\insana\\'+nom_receta, 'r', encoding = "ISO-8859-1") as f:
                receta = f.read()

            dataset.append((receta, 'insana'))


        # Guardamos en la lista las recetas relativamente_sana
        for nom_receta in (os.listdir(path+"\\relativamente_sana")):
            # Leemos y cargamos el archivo de la receta
            with open('src\\clasificacion\\relativamente_sana\\'+nom_receta, 'r', encoding = "ISO-8859-1") as f:
                receta = f.read()

            dataset.append((receta, 'relativamente_sana'))
            

        # Dividir el conjunto de datos en datos de entrenamiento y de prueba
        X = [text for text, label in dataset]
        y = [label for text, label in dataset]

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=4)

        # Crear una instancia del vectorizador
        vectorizer = CountVectorizer()

        # Entrenar el vectorizador con los datos de entrenamiento
        vectorizer.fit(X_train)

        # Vectorizar los datos de entrenamiento y de prueba
        X_train = vectorizer.transform(X_train)
        X_test = vectorizer.transform(X_test)

        # Crear una instancia del clasificador k-NN
        knn = KNeighborsClassifier(n_neighbors=7)

        # Entrenar el clasificador con los datos de entrenamiento
        knn.fit(X_train, y_train)

        # Haciendo una predicción de la nueva receta
        nueva_receta = [nueva_receta]
        new_pred = vectorizer.transform(nueva_receta)
        prediction = knn.predict(new_pred)

        return prediction


# Define una función para filtrar los ingredientes de un texto
def filtrar_ingredientes(receta):

        # Leemos el archivo del diccionario de ingredientes y guardamos su contenido en una variable
        with open('src\\clasificacion\\filtros\\ingredientes.txt', 'r') as ingredientes_file:
            ingredientes = ingredientes_file.read().splitlines()

        # Creamos una lista vacía para guardar los ingredientes de la receta
        ingredientes_receta = []

        # Iteramos sobre cada línea del archivo de la receta
        for line in receta.splitlines():
            # Iteramos sobre cada ingrediente en el diccionario de ingredientes
            for ingrediente in ingredientes:
                # Si el ingrediente está en la línea actual de la receta, lo agregamos a la lista de ingredientes de la receta
                if ingrediente in line:
                    ingredientes_receta.append(ingrediente)

        # Finalmente, imprimimos los ingredientes de la receta
        # self.textEdit.setText("Ingredientes de la receta:", ingredientes_receta)

        # Devuelve las palabras filtradas como una cadena separada por espacios
        return ' '.join(ingredientes_receta), ingredientes_receta



def trancripcion(youtubeVideoId):
        # Modelo a usar de Whisper
        modelo_whisper = 'small'

        # Se guardan las rutas de los archivos que serán creados
        audioPath = 'src\\clasificacion\\videos'
        datasetPath = 'src\\clasificacion\\dataset'
        # Se mira el numero de archivos que hay en la carpeta para asignar nombre al nuevo audio y dataset
        #num_archivos = str(len(os.listdir(datasetPath)))
        # Se concatena el nombre del archivo
        audioPath = (audioPath + '\\audio' + "1" + ".mp4")
        datasetPath = (datasetPath + '\\dataset' + "1" + ".txt")

        logging.basicConfig(
            level=logging.INFO,
            format="%(asctime)s [%(levelname)s] %(message)s",
            handlers=[
                logging.StreamHandler(sys.stdout)
            ]
        )

        # Se descarga el modelo de Whisper
        logging.info("Downloading Whisper model")
        model = whisper.load_model(modelo_whisper)

        # Se descarga el video de YOutube mediante pytube
        logging.info("Downloading the video from YouTube...")
        youtubeVideo = pytube.YouTube(youtubeVideoId)

        # Se coje solo el auidio del video
        logging.info("Get only the audio from the video")
        audio = youtubeVideo.streams.get_audio_only()
        audio.download(filename=audioPath)

        # Se transcribe el audio si existe la ruta especificada
        logging.info("Transcribe the audio")
        if (os.path.exists(audioPath)):
            result = model.transcribe(audioPath, fp16=False)
        else:
            print("Ruta no existente")

        # Se crea un fichero de texto para poner la transcrpción
        file = open(datasetPath, "w")
        file.write(result["text"])
        file.close()

        # Se enseña por pantalla el resultado
        receta = result["text"]
        logging.info(receta)

        # Se filtra para coger solo los ingredientes de la receta
        return receta 
        #receta = self.filtrar_ingredientes(receta)


if __name__ == "__main__":
        app.run(debug=True)

        
