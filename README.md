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
