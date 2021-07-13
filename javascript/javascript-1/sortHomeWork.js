var buyers = [["a", "b"], ["a", "c"], ["d", "e"]];
var recommendations = [];

for (let i = 0; i < buyers.length; i++) {
  var isNewRecommendation = false;
  for (let j = i + 1; j < buyers.length; j++) {

    if (checkSamePurchasees(buyers[i], buyers[j])) {

      if (isNewRecommendation) {
        updateRecommendation(recommendations[i], buyers[j]);
      } else {
        createRecommendation(buyers[i]);
        updateRecommendation(recommendations[i], buyers[j]);
      }
    }

  }

  if (isNewRecommendation) {
    recommendations[i] = Array.from(new Set(recommendations[i].sort()));
  }
  
}

console.log(maxItemAssociation());

function maxItemAssociation() {
  return recommendations.sort().reverse();
}

function updateRecommendation(recommendation, purchasees) {
  for (purchase of purchasees) {
    recommendation.push(purchase);
  }
}

function createRecommendation(purchase) {
  isNewRecommendation = true;
  recommendations.push(purchase.slice());
}

function checkSamePurchasees(buyerOwn, buyerTwo) {
  for (let i = 0; i < buyerOwn.length; i++) {
    for (let j = 0; j < buyerTwo.length; j++) {

      if (buyerOwn[i] == buyerTwo[j]) {
        return true;
      }

    }
  }
  return false;
}