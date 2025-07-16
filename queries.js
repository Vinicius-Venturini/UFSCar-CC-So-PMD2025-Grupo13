// Query 1
db.healthy_anomalies.aggregate([
  {
    $match: {
      "Entity": "Algeria",
      "Year": { $in: ["2017", "2018", "2019", "2020", "2021", "2022"] }
    }
  },
  {
    $project: {
      pais: "$Entity",
      codigo: "$Code",
      ano: "$Year",
      percentual_sem_dieta_saudavel: "$Share of the population who cannot afford a healthy diet",
      indice_preco_comida: "$Indicator"
    }
  },
  {
    $sort: { ano: 1 }
  }
])

// Query 2
db.diet_costs.aggregate([
  {
    $match: {
      "Year": "2021",  // Substitual pelo ano desejado 2017-2022
      "Entity": "Brazil"   // Substitua pelo país desejado
    }
  },
  {
    $project: {
      "País": "$Entity",
      "Código": "$Code",
      "Ano": 1,
      "Custo dieta saudável": 1,
      "Proporção alimentos básicos": {
        $divide: [
          { $toDouble: "$Cost of starchy staples" },
          { $toDouble: "$Cost of a healthy diet" }
        ]
      },
      "Proporção legumes, nozes e sementes": {
        $divide: [
          { $toDouble: "$Cost of legumes, nuts and seeds" },
          { $toDouble: "$Cost of a healthy diet" }
        ]
      },
      "Proporção óleos e gorduras": {
        $divide: [
          { $toDouble: "$Cost of oils and fats" },
          { $toDouble: "$Cost of a healthy diet" }
        ]
      },
      "Proporção frutas": {
        $divide: [
          { $toDouble: "$Cost of fruits" },
          { $toDouble: "$Cost of a healthy diet" }
        ]
      },
      "Proporção vegetais": {
        $divide: [
          { $toDouble: "$Cost of vegetables" },
          { $toDouble: "$Cost of a healthy diet" }
        ]
      },
      "Proporção alimentos de origem animal": {
        $divide: [
          { $toDouble: "$Cost of animal-source foods" },
          { $toDouble: "$Cost of a healthy diet" }
        ]
      }
    }
  },
  {
    $sort: {
      "Entity": 1
    }
  }
])

// Query 3
db.food_expenditure.aggregate([
  {
    $match: {
      "Year": "2018"  // Substitual pelo ano desejado 2017-2022
    }
  },
  {
    $project: {
      "País": "$Entity",
      "Código": "$Code",
      "Ano": "$Year",
      "Gasto total com comida (USD)": { $toDouble: "$Total food expenditure" },
      "Percentual álcool e tabaco": { $toDouble: "$Alcohol and tobacco as share of total consumer expenditure" },
      "Estimativa gasto álcool e tabaco (USD)": {
        $multiply: [
          { $toDouble: "$Total food expenditure" },
          { $divide: [
            { $toDouble: "$Alcohol and tobacco as share of total consumer expenditure" },
            100
          ]}
        ]
      }
    }
  },
  {
    $sort: {
      "Estimativa gasto álcool e tabaco (USD)": -1
    }
  }
])

// Query 4
db.healthy_per_capta.aggregate([
  {
    $match: {
      "Year": "2021"  // Substitual pelo ano desejado 2017-2022
    }
  },
  {
    $project: {
      "País": "$Entity",
      "Código": "$Code",
      "Ano": "$Year",
      "PIB per capita (USD)": { $toDouble: "$GDP per capita, PPP (constant 2021 international $)" },
      "Custo dieta diário (USD)": { $toDouble: "$Cost of a healthy diet" },
      "Custo dieta anual (USD)": { 
        $multiply: [{ $toDouble: "$Cost of a healthy diet" }, 365] 
      },
      "% PIB gasto com dieta saudável": {
        $multiply: [
          {
            $divide: [
              { $multiply: [{ $toDouble: "$Cost of a healthy diet" }, 365] },
              { $toDouble: "$GDP per capita, PPP (constant 2021 international $)" }
            ]
          },
          100
        ]
      }
    }
  },
  {
    $sort: {
      "% PIB gasto com dieta saudável": -1
    }
  }
])

// Query 5
db.healthy_insecurity.aggregate([
  {
    $match: {
      "Year": "2021"  // Substitua pelo ano
    }
  },
  {
    $project: {
      "País": "$Entity",
      "Código": "$Code",
      "Custo dieta saudável (USD)": { $toDouble: "$Cost of a healthy diet" },
      "Insegurança alimentar (%)": { 
        $toDouble: "$Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average) | 00210091 || Value | 006121 || percent" 
      },
      "Classificação custo": {
        $cond: {
          if: { $lt: [{ $toDouble: "$Cost of a healthy diet" }, 3.0] },
          then: "Baixo custo",
          else: {
            $cond: {
              if: { $lt: [{ $toDouble: "$Cost of a healthy diet" }, 5.0] },
              then: "Custo médio",
              else: "Alto custo"
            }
          }
        }
      },
      "Classificação insegurança": {
        $cond: {
          if: { $lt: [{ $toDouble: "$Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average) | 00210091 || Value | 006121 || percent" }, 15] },
          then: "Baixa insegurança",
          else: {
            $cond: {
              if: { $lt: [{ $toDouble: "$Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average) | 00210091 || Value | 006121 || percent" }, 30] },
              then: "Insegurança moderada",
              else: "Alta insegurança"
            }
          }
        }
      }
    }
  },
  {
    $sort: {
      "Custo dieta saudável (USD)": 1
    }
  }
])
