
import { getNutrientValue } from '../../util'

describe('Utility Functions ', () => {
  it('retrieve nutrient value from json ', async () => {
    let json = 
      {
         "foodNutrients":[
            {
               "nutrientId":1003,
               "nutrientName":"Protein",
               "nutrientNumber":"203",
               "unitName":"G",
               "derivationCode":"LCSL",
               "derivationDescription":"Calculated from a less than value per serving size measure",
               "derivationId":73,
               "value":2.56,
               "foodNutrientSourceId":9,
               "foodNutrientSourceCode":"12",
               "foodNutrientSourceDescription":"Manufacturer's analytical; partial documentation",
               "rank":600,
               "indentLevel":1,
               "foodNutrientId":24024317
            },
            {
               "nutrientId":1004,
               "nutrientName":"Total lipid (fat)",
               "nutrientNumber":"204",
               "unitName":"G",
               "derivationCode":"LCCS",
               "derivationDescription":"Calculated from value per serving size measure",
               "derivationId":70,
               "value":15.4,
               "foodNutrientSourceId":9,
               "foodNutrientSourceCode":"12",
               "foodNutrientSourceDescription":"Manufacturer's analytical; partial documentation",
               "rank":800,
               "indentLevel":1,
               "foodNutrientId":24024318,
               "percentDailyValue":9
            },
            {
               "nutrientId":1005,
               "nutrientName":"Carbohydrate, by difference",
               "nutrientNumber":"205",
               "unitName":"G",
               "derivationCode":"LCCS",
               "derivationDescription":"Calculated from value per serving size measure",
               "derivationId":70,
               "value":69.2,
               "foodNutrientSourceId":9,
               "foodNutrientSourceCode":"12",
               "foodNutrientSourceDescription":"Manufacturer's analytical; partial documentation",
               "rank":1110,
               "indentLevel":2,
               "foodNutrientId":24024319,
               "percentDailyValue":9
            }]}
    result  = getNutrientValue(json,"Carbohydrate, by difference")
    expect(result).toBe(69.2);
  });
});