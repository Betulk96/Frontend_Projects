export const parseDietFromAnswer = (answer, addNotification) => {
  if (!answer) return { macros: null, stats: null };
  //console.log("answer", answer);

  const macros = {
    protein: null,
    carbs: null,
    fats: null,
  };

  // Protein (hem kcal'li hem de gram/day'li formatlar)
  let proteinMatch = answer.match(
    /\*\*Protein:\*\*\s*(\d+)%\s*\(~([\d,.]+)\s*kcal\s*\/\s*~([\d,.]+)\s*g\)/i
  );
  if (!proteinMatch) {
    proteinMatch = answer.match(
      /-\s*\*\*Protein:\*\*\s*(\d+)%\s*\(~([\d,.]+)\s*kcal\s*\/\s*~([\d,.]+)\s*g\)/i
    );
  }
  // Yeni format: (~80 grams/day)
  if (!proteinMatch) {
    proteinMatch = answer.match(
      /-\s*\*\*Protein:\*\*\s*(\d+)%\s*\(~([\d,.]+)\s*grams\/day\)/i
    );
    if (proteinMatch) {
      macros.protein = {
        name: "protein",
        pct: parseFloat(proteinMatch[1]),
        kcal: null,
        grams: parseFloat(proteinMatch[2].replace(/,/g, "")),
      };
    }
  } else {
    macros.protein = {
      name: "protein",
      pct: parseFloat(proteinMatch[1]),
      kcal: parseFloat(proteinMatch[2].replace(/,/g, "")),
      grams: parseFloat(proteinMatch[3].replace(/,/g, "")),
    };
  }

  // Carbs
  let carbsMatch = answer.match(
    /\*\*Carbohydrates:\*\*\s*(\d+)%\s*\(~([\d,.]+)\s*kcal\s*\/\s*~([\d,.]+)\s*g\)/i
  );
  if (!carbsMatch) {
    carbsMatch = answer.match(
      /-\s*\*\*Carbohydrates:\*\*\s*(\d+)%\s*\(~([\d,.]+)\s*kcal\s*\/\s*~([\d,.]+)\s*g\)/i
    );
  }
  if (!carbsMatch) {
    carbsMatch = answer.match(
      /-\s*\*\*Carbohydrates:\*\*\s*(\d+)%\s*\(~([\d,.]+)\s*grams\/day\)/i
    );
    if (carbsMatch) {
      macros.carbs = {
        name: "carbs",
        pct: parseFloat(carbsMatch[1]),
        kcal: null,
        grams: parseFloat(carbsMatch[2].replace(/,/g, "")),
      };
    }
  } else {
    macros.carbs = {
      name: "carbs",
      pct: parseFloat(carbsMatch[1]),
      kcal: parseFloat(carbsMatch[2].replace(/,/g, "")),
      grams: parseFloat(carbsMatch[3].replace(/,/g, "")),
    };
  }

  // Fats
  let fatsMatch = answer.match(
    /\*\*Fats:\*\*\s*(\d+)%\s*\(~([\d,.]+)\s*kcal\s*\/\s*~([\d,.]+)\s*g\)/i
  );
  if (!fatsMatch) {
    fatsMatch = answer.match(
      /-\s*\*\*Fats:\*\*\s*(\d+)%\s*\(~([\d,.]+)\s*kcal\s*\/\s*~([\d,.]+)\s*g\)/i
    );
  }
  if (!fatsMatch) {
    fatsMatch = answer.match(
      /-\s*\*\*Fats:\*\*\s*(\d+)%\s*\(~([\d,.]+)\s*grams\/day\)/i
    );
    if (fatsMatch) {
      macros.fats = {
        name: "fats",
        pct: parseFloat(fatsMatch[1]),
        kcal: null,
        grams: parseFloat(fatsMatch[2].replace(/,/g, "")),
      };
    }
  } else {
    macros.fats = {
      name: "fats",
      pct: parseFloat(fatsMatch[1]),
      kcal: parseFloat(fatsMatch[2].replace(/,/g, "")),
      grams: parseFloat(fatsMatch[3].replace(/,/g, "")),
    };
  }

  // Kalori bulma
  const matchCalories =
    answer.match(/approximately\s*\*\*([\d,.]+)\s*kcal\s*daily\*\*/i) ||
    answer.match(/\*\*([\d,.]+)\s*kcal\s*daily\*\*/i) ||
    answer.match(/yaklaşık\s*\*\*([\d,.]+)\s*kcal/i);

  const stats = {
    totalCalories: matchCalories
      ? parseInt(matchCalories[1].replace(/,/g, ""))
      : null,
  };

  const allValid =
    macros.protein?.grams &&
    macros.carbs?.grams &&
    macros.fats?.grams &&
    stats.totalCalories;

  if (allValid && typeof addNotification === "function") {
    addNotification({
      type: "success",
      title: "Diet Breakdown Extracted",
      description: `Protein: ${macros.protein.grams}g, Carbs: ${macros.carbs.grams}g, Fats: ${macros.fats.grams}g`,
      url: "/main",
    });
  }

  return { macros, stats };
};
