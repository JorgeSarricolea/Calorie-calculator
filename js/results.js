// Retrieves the selected value from localStorage
const selectedOption = localStorage.getItem("selectedOption");
const age = localStorage.getItem("age");
const weight = localStorage.getItem("weight");
const height = localStorage.getItem("height");
const activityLevel = localStorage.getItem("activityLevel");

// Elements
const elementById = document.getElementById.bind(document);

// Calculate BMI
function CalculateBMI(weight, height) {
  // Convert height to meters
  if (height > 3) {
    height /= 100;
  }

  var bmi = weight / height ** 2;
  return bmi.toFixed(2);
}

// Print the BMI element
const BMI = CalculateBMI(weight, height);
elementById("bmi-text").textContent = BMI;

// BMI Scale
const BMIScale = {
  severeThinness: { min: 0, max: 16, name: "Severe Thinness", color: "red" },
  moderateThinness: {
    min: 16.01,
    max: 17,
    name: "Moderate Thinness",
    color: "orange",
  },
  mildThinness: {
    min: 17.01,
    max: 18.59,
    name: "Mild Thinness",
    color: "yellow",
  },
  normal: { min: 18.6, max: 25, name: "Normal", color: "green" },
  overWeight: { min: 25.01, max: 30, name: "Overweight", color: "blue" },
  obeseClass1: { min: 30.01, max: 35, name: "Obese Class 1", color: "yellow" },
  obeseClass2: { min: 35.01, max: 40, name: "Obese Class 2", color: "orange" },
  obeseClass3: { min: 40.01, max: 100, name: "Obese Class 3", color: "red" },
};

// Function to determine BMI category
function getBMICategory(BMI) {
  for (var key in BMIScale) {
    if (BMI >= BMIScale[key].min && BMI <= BMIScale[key].max) {
      return BMIScale[key]; // Returns the entire BMI category object
    }
  }
  return { name: "Undefined Category", min: 0, max: 0 }; // In case the BMI is not in any defined category
}

// Print the category
const categoryObject = getBMICategory(BMI);
elementById(
  "bmi-category-text"
).textContent = `Category: ${categoryObject.name}, Range: ${categoryObject.min} - ${categoryObject.max}`;

// Calculate MBR
function CalculateMBR(age, height, weight, selectedOption) {
  if (selectedOption === "man-option") {
    // Harris-Benedict Formula
    var mbrMan = 10 * weight + 6.25 * height - 5 * age + 5;
    return mbrMan.toFixed(2);
  } else if (selectedOption === "woman-option") {
    // Harris-Benedict Formula
    var mbrWoman = 10 * weight + 6.25 * height - 5 * age + 161;
    return mbrWoman.toFixed(2);
  }
}

// Print the MBR element
const MBR = CalculateMBR(age, height, weight, selectedOption);
elementById("mbr-text").textContent = `You need ${MBR} kcal everyday`;

// Physical activity scale
const activityScale = {
  sedentary: { value: 1.2, name: "Sedentary" },
  light: { value: 1.375, name: "Light workout" },
  moderate: { value: 1.55, name: "Moderate workout" },
  active: { value: 1.725, name: "Active workout" },
  "very-active": { value: 2, name: "Very active workout" },
};

// Function to determine MBR + Physical activity
function getMBRactivity(MBR, activityLevel) {
  if (activityLevel in activityScale) {
    var physicalActivityValue = activityScale[activityLevel].value;
    return MBR * physicalActivityValue;
  } else {
    return "Undefined Physical Activity";
  }
}

// Print the MBR + Physical activity element
const MBRplusActivity = getMBRactivity(MBR, activityLevel).toFixed(2);
elementById(
  "mbr-activity-text"
).textContent = `Physical Activity: ${activityScale[activityLevel].name}. You need ${MBRplusActivity} kcal`;
elementById(
  "mbr-explanation"
).textContent = `This value gets by multiply ${activityScale[activityLevel].value} by your current Metabolic Basal Rate.`;
