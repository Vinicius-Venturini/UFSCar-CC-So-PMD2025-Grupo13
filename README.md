# A acessibilidade da alimentação no mundo

## Integrantes

- Bruno dos Santos Ferraz | 796085
- Marcus Vinícius Caruso Leite | 792200
- Vinícius Carvalho Venturini | 793250

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
|Retorne a porcentagem de quantos não conseguem sustentar uma dieta saudável, incluindo a porcentagem do preço superfaturado do continente de 2017 até 2022|A ideia é mostrar um comparativo da porcentagem da população por país que consegue manter uma dieta saudável e o quanto isso é caro em questão de inflação.|[Dataset 1](https://ourworldindata.org/grapher/share-healthy-diet-unaffordable?time=latest)|[Dataset 2](https://ourworldindata.org/grapher/share-of-countries-recording-high-food-prices?tab=table)|
|Retorne o gasto diário em dólar por país comparado pelo custo diário em dólar de uma dieta saudável em 2021 considerando cada tipo de comida|Com a query, temos o comparativo do gasto que uma pessoa faz com cada tipo de comida em relação ao o custo da dieta saudável diariamente naquele país.|[Dataset 1](https://ourworldindata.org/grapher/cost-foods-healthy-diet?tab=table)|[Dataset 2](https://ourworldindata.org/grapher/cost-healthy-diet?time=2022)|
|Dado um ano X, retorne quanto uma pessoa gastou com comida naquele ano e inclua o percentual de gasto em tabaco e álcool daquele mesmo ano por país|Fomentar a discussão acerca de países com um alto percentual de gasto de tabaco e álcool com relação a comida.|[Dataset 1](https://ourworldindata.org/grapher/food-expenditure-per-person-per-year)|[Dataset 2](https://ourworldindata.org/grapher/share-expenditure-alcohol-tobacco)|
|Evolução do custo de uma dieta saudável em relação ao PIB per capita|Mostrar como o custo diário de uma dieta saudável evoluiu ao longo dos anos, para identificar se ficou mais acessível ou mais difícil manter uma dieta saudável.|[Dataset 1](https://ourworldindata.org/grapher/cost-healthy-diet)|[Dataset 2](https://ourworldindata.org/grapher/gdp-per-capita-worldbank)|
|Comparar custo da dieta saudável com a prevalência de insegurança alimentar|Comparar se um país com o custo menor de uma dieta saudável, possuí também uma menor taxa de pessoas com insegurança alimentar.|[Dataset 1](https://ourworldindata.org/grapher/cost-healthy-diet)|[Dataset 2](https://ourworldindata.org/grapher/share-of-population-with-moderate-or-severe-food-insecurity)|
<p align="center"><b>Tabela 1:</b> Dados a serem cruzados e explorados</p>

## Desenvolvimento

Para a realização do projeto, foi criado um código comum que realiza a integração e persistência de dados entre arquivos *CSV* e o *MongoDB* usando *PySpark*. Ele começa carregando dois *datasets CSV*, e normaliza as colunas de junção removendo espaços em branco das colunas "Entity", "Code" e "Year". Em seguida, realiza um *join* entre os dois *datasets* com base nessas colunas, tratando separadamente os casos em que a coluna "Code" é nula, unindo esses dados ao resultado principal. Por fim, o *DataFrame* resultante é salvo no *MongoDB*, utilizando o modo *overwrite*, ou seja, substituindo os dados anteriores da coleção.

Após os dados já estarem processados e salvos no *MongoDB*, foram feitas 5 *queries* para os objetivos das consultas já listados anteriormente, essas consultas são independentes entre si e podem ser utilizadas alterando os parâmetros de *match*, para a visualização dos dados para um país ou ano específico. As consultas utilizam agregação, fazendo os cálculos necessários para encontrar taxas de variação, porcentagens e estimativas. Essas consultas foram utilizadas para gerar alguns gráficos que mostram de maneira visual os resultados a serem alcançados.

### Dificuldades

A maior dificuldade enfrentada foi o acesso ao *Databricks* para a utilização do *Apache Spark*, já que apenas um integrante do nosso grupo tinha o acesso à versão *Community*, onde é possível fazer a manipulação das bibliotecas instaladas para que seja possível a conexão entre o *Spark* e o *MongoDB* diretamente e de forma distribuída.

Outra dificuldade também foi em relação à primeira query, já que não conseguimos cruzar os dados do *dataset* que tinha as informações de inflação com os dados de quantos não conseguem sustentar uma dieta saudável. Então ao invés de relacionar quantos não conseguem sustentar uma dieta saudável com a inflação, optamos por cruzar com o índice de variação do preço de comida, no qual foi possível fazer a junção dos dados.

- **Query 1 original:** Retorne a porcentagem de quantos não conseguem sustentar uma dieta saudável, incluindo a porcentagem do preço superfaturado do continente de 2017 até 2022
- **Query 1 atualizada:** Retorne a porcentagem de quantos não conseguem sustentar uma dieta saudável, incluindo o índice da variação do preço da comida de um dado país de 2017 até 2022

## Conclusão 

Ao realizar as junções e verificar os resultados das consultas, conclui-se que não necessariamente há uma relação entre dois dados distintos para que um país tenha acessibilidade a uma dieta saudável, os fatores que levam um país a ter ou não acesso a comida de qualidade são diversos, e observando apenas uma parte dos dados não diz muita coisa sobre o que este país enfrenta. Outro ponto importante é que todos os dados utilizados neste projetos vinham da mesma fonte, o que pode gerar um viés nos resultados obtidos. Um possível estudo futuro seria verificar a acessibilidade de uma alimentação saudável levando em consideração outros fatores que não foram inseridos neste estudo, como cultura do país, embargos econômicos, etc.

### Resultados das consultas

Os resultados destacados nestes gráficos apresentam apenas alguns países para facilitar a visualização, para verificar os dados completos, realize a consulta ao banco.

#### Consulta 1

Retorne a porcentagem de quantos não conseguem sustentar uma dieta saudável, incluindo o índice da variação do preço da comida de um dado país de 2017 até 2022

<p align="center">
  <img src="https://github.com/Vinicius-Venturini/UFSCar-CC-So-PMD2025-Grupo13/blob/main/images/query1.png">
</p>

#### Consulta 2

Retorne o gasto diário em dólar por país comparado pelo custo diário em dólar de uma dieta saudável em 2021 considerando cada tipo de comida

<p align="center">
  <img src="https://github.com/Vinicius-Venturini/UFSCar-CC-So-PMD2025-Grupo13/blob/main/images/query2.png">
</p>

#### Consulta 3

Dado um ano X, retorne quanto uma pessoa gastou com comida naquele ano e inclua o percentual de gasto em tabaco e álcool daquele mesmo ano por país

<p align="center">
  <img src="https://github.com/Vinicius-Venturini/UFSCar-CC-So-PMD2025-Grupo13/blob/main/images/query3.png">
</p>

#### Consulta 4

Evolução do custo de uma dieta saudável em relação ao PIB per capita

<p align="center">
  <img src="https://github.com/Vinicius-Venturini/UFSCar-CC-So-PMD2025-Grupo13/blob/main/images/query4.png">
</p>

#### Consulta 5

Comparar custo da dieta saudável com a prevalência de insegurança alimentar

<p align="center">
  <img src="https://github.com/Vinicius-Venturini/UFSCar-CC-So-PMD2025-Grupo13/blob/main/images/query5.png">
</p>
