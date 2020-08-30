pay = float
acceptablePay = [10.0,11.0,9.0]
favoriteField = str
favoriteWorkCulture = str


def payAdjustment(): #function finding the average pay of jobs the user liked 
    likedJobPay = input(float)
    acceptablePay.append(float(likedJobPay))
    arrayTotal = sum(acceptablePay)
    preferredPay = arrayTotal / len(acceptablePay)
    return(preferredPay)
payAdjustment()

def workCulturePick(): #function finding the most common work culture of the jobs the user liked
    casual = 0
    businessCasual = 0
    businessFormal = 0
    workCultureTypes = {
        "1" : casual,
        "2" : businessCasual,
        "3" : businessFormal
    }
    likedWorkCulture = input(str)
    chosenWorkCulture = workCultureTypes.get(likedWorkCulture)
    chosenWorkCulture += 1
    cultureTypes = workCultureTypes.items()
    highestCultureType = max(workCultureTypes.items())#highestCultureType does not register as the workCultureType item with the highest value as it should. instead it returns "none" when highestCultureType is printed
    cultureNames = {
        "1" : "Casual",
        "2" : "Business Casual",
        "3" : "Business Formal"
    }
    return(cultureNames.get(highestCultureType))
workCulturePick()