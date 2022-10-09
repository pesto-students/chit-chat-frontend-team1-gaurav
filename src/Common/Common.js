


// const expired = () => {
//     const JWTtoken = localStorage.getItem('token');

//     const jwtPayload = JSON.parse(window.atob(JWTtoken.split('.')[1]))

//     const tokenExpired = jwtPayload.exp >= Date.now();

//     if(JWTtoken === '' || JWTtoken === undefined || JWTtoken === null || !tokenExpired) {
//         return true;
//     }
//     else {
//         return false;
//     }


// }


export const getFilteredMessageArrayDayWise = (messageArray) => {

    var referenceArray = [...messageArray];

    if(referenceArray.length === 0){
        return [];
    }
    else{

    var firstDate = messageArray[0].timestamp;
    var lastDate = messageArray[messageArray.length - 1].timestamp;

    var getDaysArray = function (startTimestamp, endTimestamp) {
        var StartDate = new Date(
          `${new Date(startTimestamp).getFullYear()}-${
            new Date(startTimestamp).getMonth() + 1 < 10 ? "0" : ""
          }${new Date(startTimestamp).getMonth() + 1}-${
            new Date(startTimestamp).getDate() < 10 ? "0" : ""
          }${new Date(startTimestamp).getDate()}`
        );
        var EndDate = new Date(
          `${new Date(endTimestamp).getFullYear()}-${
            new Date(endTimestamp).getMonth() + 1 < 10 ? "0" : ""
          }${new Date(endTimestamp).getMonth() + 1}-${
            new Date(endTimestamp).getDate() < 10 ? "0" : ""
          }${new Date(endTimestamp).getDate()}`
        );
      
        for (var arr = [], dt = new Date(StartDate);dt <= new Date(EndDate);dt.setDate(dt.getDate() + 1)) {
          arr.push(new Date(dt));
        }
        return arr;
      };

    var daylist = getDaysArray(lastDate,firstDate)
    


    const checkDatesEquality = (date1,date2) => {
        var Date1 = new Date(date1)
        var Date2= new Date(date2)

        if(Date1.getDate() !== Date2.getDate()){
            return false;
        }
        else if(Date1.getMonth() !== Date2.getMonth()){
            return false;
        }
        else if(Date1.getFullYear() !== Date2.getFullYear()){
            return false;
        }
        else{
            return true;
        }
    }

    const getmonth = (month) => {
        switch (month) {
          case 1:
            return "Jan";
          case 2:
            return "Feb";
          case 3:
            return "Mar";
          case 4:
            return "Apr";
          case 5:
            return "May";
          case 6:
            return "Jun";
          case 7:
            return "July";
          case 8:
            return "Aug";
          case 9:
            return "Sep";
          case 10:
            return "Oct";
          case 11:
            return "Nov";
          case 12:
            return "Dec";
          default:
            break;
        }
      };

    const getLabel = (date) => {
        var givenDate = new Date(date)
        var todaysDate = new Date();

        if(givenDate.getDate() === todaysDate.getDate() 
           && givenDate.getMonth() === todaysDate.getMonth()
           && givenDate.getFullYear() === todaysDate.getFullYear()) {
               return 'Today'
           }
        else if(givenDate.getDate() === (todaysDate.getDate() - 1)
            && givenDate.getMonth() === todaysDate.getMonth()
            && givenDate.getFullYear() === todaysDate.getFullYear())
            {
                return 'Yesterday'
            }
        else{
            return `${givenDate.getDate()} ${getmonth(givenDate.getMonth())} ${givenDate.getFullYear()}`
        }

    }


    
     var finalArray = [];
     daylist.reverse().map((date) => {

         var singleDateArray={};
         singleDateArray['label'] = getLabel(date);
         singleDateArray['messageArray'] = [];

        
             while(true) {
            for (let i = 0; i < referenceArray.length; i++) {
                if(checkDatesEquality(referenceArray[i].timestamp,date)){
                    singleDateArray.messageArray.push(referenceArray[i]);
                    if(i === referenceArray.length - 1){
                    finalArray.push(singleDateArray);
                    return;
                    }

                }
                else{
                    if(singleDateArray.messageArray.length > 0)
                    finalArray.push(singleDateArray);

                    referenceArray.splice(0,i);
                    return;
                }
                
            }
            return;
        }
            
         
     })

     return finalArray;
    }
}



// module.exports = getFilteredMessageArrayDayWise;