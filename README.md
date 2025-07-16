# A acessibilidade da alimentação no mundo

## Resumo do tema

O projeto tem como tema a acessibilidade da alimentação no mundo, utilizando dados públicos disponíveis na plataforma *ourworldindata*, especificamente sobre preços e disponibilidade de alimentos. Para isso, o Apache Spark será utilizado para o processamento e cruzamento de dados em JSON, utilizando atributos em comum para cruzar os dados como: país, ano, continente e etc. O banco de dados NoSQL MongoDB será utilizado para armazenar os resultados desses cruzamentos, para facilitar a análise desses dados por meio de consultas Map/Reduce e agregações (Figura 1). 

O objetivo é explorar aspectos relevantes de acessibilidade alimentar globalmente, identificando padrões e disparidades entre regiões, tentando levantar dados que consigam relacionar a acessibilidade a uma alimentação saudável com outros dados públicos, e inferir a partir destes, se conseguimos associar o acesso à comida a outras métricas dos países.

```mermaid
flowchart TD
D([Usuário]) -->|Consulta dos dados| C[MongoDB]
A[OurWorldInData Datasets] -->|Consumo e processamento dos dados| B[Apache Spark] -->|Salvar dados cruzados| C
```
<p align="center"><b>Figura 1:</b> Fluxograma do funcionamento</p>

## Tecnologias utilizadas

- **Apache Spark:** No contexto deste projeto, o Spark é extremamente necessário no cruzamento de dados grandes vindos dos *datasets* da plataforma *ourworldindata*, sendo possível fazer junções de forma eficiente graças a sua capacidade de processamento distribuído dos dados, otimizando o tempo de resposta e garantindo maior confiabilidade na preparação dos dados.
- **MongoDB:** O MongoDB é utilizado como repositório principal para persistir os dados já processados e cruzados pelo Spark. Como este armazena os dados cruzados em documentos que podem possuir diversas informações cruzadas, é possível realizar operações de agregação e redução dos dados para o retorno de dados tratatos que serão utilizados para atigir nosso objetivo.

## Objetivo
Cruzar dados sobre alimentação ao redor do mundo, analisando sua acessibilidade e outras informações relevantes por meio de consultas (Tabela 1).

|Título da consulta|Descrição|Dataset 1|Dataset 2|
|------------------|---------|---------|---------|
|Retorne a porcentagem de quantos não conseguem sustentar uma dieta saudável, incluindo a porcentagem da variação do preço de um dado país de 2017 até 2022|A ideia é mostrar um comparativo da porcentagem da população por país que consegue manter uma dieta saudável e o quanto isso é caro em questão de inflação.|[Dataset 1](https://ourworldindata.org/grapher/share-healthy-diet-unaffordable?time=latest)|[Dataset 2](https://ourworldindata.org/grapher/share-of-countries-recording-high-food-prices?tab=table)|
|Retorne o gasto diário em dólar por país comparado pelo custo diário em dólar de uma dieta saudável em 2021 considerando cada tipo de comida|Com a query, temos o comparativo do gasto que uma pessoa faz com cada tipo de comida em relação ao o custo da dieta saudável diariamente naquele país.|[Dataset 1](https://ourworldindata.org/grapher/cost-foods-healthy-diet?tab=table)|[Dataset 2](https://ourworldindata.org/grapher/cost-healthy-diet?time=2022)|
|Dado um ano X, retorne quanto uma pessoa gastou com comida naquele ano e inclua o percentual de gasto em tabaco e álcool daquele mesmo ano por país|Fomentar a discussão acerca de países com um alto percentual de gasto de tabaco e álcool com relação a comida.|[Dataset 1](https://ourworldindata.org/grapher/food-expenditure-per-person-per-year)|[Dataset 2](https://ourworldindata.org/grapher/share-expenditure-alcohol-tobacco)|
|Evolução do custo de uma dieta saudável em relação ao PIB per capita|Mostrar como o custo diário de uma dieta saudável evoluiu ao longo dos anos, para identificar se ficou mais acessível ou mais difícil manter uma dieta saudável.|[Dataset 1](https://ourworldindata.org/grapher/cost-healthy-diet)|[Dataset 2](https://ourworldindata.org/grapher/gdp-per-capita-worldbank)|
|Comparar custo da dieta saudável com a prevalência de insegurança alimentar|Comparar se um país com o custo menor de uma dieta saudável, possuí também uma menor taxa de pessoas com insegurança alimentar.|[Dataset 1](https://ourworldindata.org/grapher/cost-healthy-diet)|[Dataset 2](https://ourworldindata.org/grapher/share-of-population-with-moderate-or-severe-food-insecurity)|
<p align="center"><b>Tabela 1:</b> Dados a serem cruzados e explorados</p>
