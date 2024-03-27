const apiConstants={
BASE_URL:"https://gnnservice.thegatewaycorp.com/api/",
// BASE_URL:"https://gnnstaging.thegatewaycorp.com:4435/api/",  //Staging URL

NEWS_BASE_URL:"https://demo.thegatewaycorp.com/gnnapi/wp-json/wp/v2/",
// NEWS_BASE_URL:"https://gnnstaging.thegatewaycorp.com:4435/gnnapi/wp-json/wp/v2/", //Staging URL

Post:"crypt/post",
Category : 'newscategory',
Notification : 'notifications',
GetSnacksDetails : "Cafeteria/GetCafeteriaDetailsForGNN",
NewsDetail : "newsdetail",
SaveLikeCount : "savelikecount",
Unlike : "decreaselikecount",
SaveComment : "savecomment",
Birthday : "Birthday/GetMonthBirthdayList",
News : "news",
CheckVersion : "checkversion",
HolidayList: "Holiday/GetHolidayList",
MyLeaves: "Leave/GetMyLeavesDataYearWiseByEmpId",
Work_From_Home : "WorkFromHome/GetWorkFromHomeDetailByEmpId",
outOfOffice : "OutOfOfficeWork/GetOutOfOfficeDetailByEmpId",
cafeteria  : "Cafeteria/InsertEmployeeCafeteriaDetails",
APICALL: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    APPLICATION_JSON: "application/json",
    MULTIPART_FORM: "multipart/form-data"
  },
STATUSCODE: {
    SUCCESS: 200,
    INTERNAL_SERVER_ERROR: 500,
    USER_ERROR: 401,
    REDIRECTION_ERROR: 300,
    EMAIL_EXIST: 420,
    USER_ERROR2: 404
  },
}
export default apiConstants;