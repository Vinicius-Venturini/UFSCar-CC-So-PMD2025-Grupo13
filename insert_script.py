from pyspark.sql.functions import col, trim

# Conexão MongoDB
connectionString='mongodb+srv://ferrazbr:1234@cluster0.ftjsxua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

# Nome do banco e da coleção
database="PMD2025BRUNO"
collection="healthy_price_anomalies"

# Carregar CSVs
df1 = spark.read.format("csv").option("header", "true").load("dbfs:/FileStore/shared_uploads/brunoferraz@estudante.ufscar.br/food_price_anomaliesv3.csv")
df2 = spark.read.format("csv").option("header", "true").load("dbfs:/FileStore/shared_uploads/brunoferraz@estudante.ufscar.br/share_healthy_diet_unaffordablev2.csv")

# Normalizar colunas de join (remover espaços)
for col_name in ["Entity", "Code", "Year"]:
    df1 = df1.withColumn(col_name, trim(col(col_name)))
    df2 = df2.withColumn(col_name, trim(col(col_name)))

# Realizar join
joined_df = df1.join(df2, on=["Entity", "Code", "Year"])

# Tratar casos onde "Code" é nulo
null_code_df1 = df1.where(col("Code").isNull())
null_code_df2 = df2.where(col("Code").isNull())
null_code_joined_df = null_code_df1.join(null_code_df2, on=["Entity", "Code", "Year"])

# Unir os dois DataFrames (normal e nulos)
final_df = joined_df.union(null_code_joined_df)

# Salvar no MongoDB
final_df.write.format("mongodb")\
    .mode("overwrite")\
    .option("database", database)\
    .option("collection", collection)\
    .option("spark.mongodb.write.connection.uri", connectionString)\
    .save()
