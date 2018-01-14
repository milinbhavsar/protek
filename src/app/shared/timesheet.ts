export interface Timesheet {
  id: string;
  Sunday: string;
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  user_id: string;
  submit: string;
  aprove_status: string;
  req_status: string;
  working_hours: string;
  start_date: string;
  end_date: string;
  projname: string;
}


/*
Example data:
'id': '261',
  'Sunday': '0,2016-11-20',
  'Monday': '8,2016-11-21',
  'Tuesday': '8,2016-11-22',
  'Wednesday': '8,2016-11-23',
  'Thursday': '0,2016-11-24',
  'Friday': '0,2016-11-25',
  'Saturday': '0,2016-11-26',
  'user_id': '433',
  'submit': 'true',
  'aprove_status': '1',
  'req_status': 'N',
  'working_hours': '24',
  'start_date': '2016-11-20',
  'end_date': '2016-11-26',
  'projname': ''
* */
