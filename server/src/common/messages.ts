export const ERROR_MESSAGES = {
    //-------- Email Errors ---------
    EMAIL_NOT_SENT: "Email could not be sent",
    EMAIL_NOT_FOUND: "Email not found",
    EMAIL_ALREADY_EXISTS: "Email already exists",
    EMAIL_NOT_VERIFIED: "Email not verified",
    EMAIL_DOES_NOT_MATCH: "Provided email does not match, the verified email",
    //-------- Invalid Data Errors ---------
    MISSING_FIELD: "Missing required fields",
    VALIDATION_FAILED: "Validation Failed, Please check the data you have provided",
    TRY_AGAIN: "Please try again later.",
    //-------- OTP Errors ---------
    OTP_NOT_SENT: "OTP could not be sent",
    OTP_NOT_FOUND: "OTP not found",
    OTP_ALREADY_EXISTS: "OTP already exists",
    OTP_EXPIRED: "OTP expired",
    ERROR_VERIFYING_OTP: "Error verifying OTP",
    SOMETHING_WENT_WRONG: "Something went wrong",

    USER_NOT_CREATED: "User could not be created",
    UNAUTHORIZED: "Unauthorized access",
    SERVER_ERROR: 'Something went wrong, please try again later.',
    INCORRECT_PASSWORD: 'Incorrect Password',
    ACCOUNT_ALREADY_VERIFIED: 'Account already verified',
    USER_ALREADY_EXISTS: 'A user with this Email Id already exists.',
    USER_NOT_FOUND: 'User not found.',
    INVALID_USER:'User With Given Id Not Exist',
    NOT_AUTH: 'Not Authorized Login Again',
    JWT_SECRET_ERROR: 'Jwt secret not defined',
    INVALID_EMAIL: 'Email format is invalid.',
    INVALID_AGE: 'Age must be greater than 0.',
    INVALID_PASSWORD: 'Password must meet the required criteria.',
    INVALID_LOCATION_ID: 'Invalid Location ID',
    INVALID_COACHING_PLAN_ID: 'Invalid Coaching Plan ID',
    INVALID_COACHING_SCHEDULE_ID: 'Invalid Coaching Schedule ID',
    INVALID_OTP: 'Invalid OTP',
    INVALID_DAYS: `Selected Days are Invalid, Please select from 'MTWTFSS'`,
    
    NO_DATA_FOUND: 'No data found',
    DATA_NOT_INSERTED:'Data Insertion Failed',
    EXISTING_LOCATION: 'Location with same name already exists',
    NOT_ABLE_TO_FETCH_USERS_ATTENDANCE_DATA:'Not able to fetch users data for attendance ',
    UPDATION_FAILED:'Upadation Failed...., try again.'
  };

  export const SUCCESS_MESSAGES = {
    //-------- OTP Success Messages ---------
    OTP_SENT_SUCCESSFULLY: 'OTP sent successfully',
    OTP_VERIFIED: 'OTP verified successfully',

    USER_CREATED: 'New user created successfully',
    USER_LOGGED_IN: 'User loged in successfully',
    USER_LOGOUT: 'User loged out successfully',
    USER_NOT_FOUND: 'User not found.',
    USER_DATA_UPDATED: 'User data updated successfully',
    USER_PLAN_DATA_CREATED: 'User Plan data has been successfully created',
    LOCATION_ADDED: "New location added successfully",
    COACHING_PLAN_ADDED: "New coaching plan added successfully",
    COACHING_SCHEDULE_ADDED: "New coaching schedule added successfully",
    VERIFICATION_EMAIL_SEND: 'Verification Email Send Successfully',
    RESET_PASSWORD_EMAIL_SEND: 'Reset Password OTP Send Successfully',
    EMAIL_VERIFIED: 'Email verified succeddsully',
    PASSWORD_RESET_SUCCESS: 'Password has been reset successfully',
    LOCATION_DATA_FETCHED: 'Location data fetched successfully',
    USER_DATA_FETCHED: 'User data fetched successfully',
    PLAN_DATA_FETCHED: 'Coaching plan data fetched successfully',
    SCHEDULE_DATA_FETCHED: 'Coaching schedule data fetched successfully',
    NO_DATA_FOUND:'Data Not Available',
    ACCOUNT_ALREADY_VERIFIED: 'Account already verified',
    LOCATION_REMOVED: 'Location removed successfully',
    SCHEDULE_REMOVED: 'Coaching Schedule removed successfully',
    ATTENDANCE_DATA_FETCHED:'Attendence Data Fetched Successfully',
    UPDATE_SUCCESSFUL:'Updation Successful'
  }