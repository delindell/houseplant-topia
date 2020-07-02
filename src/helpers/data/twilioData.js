import axios from 'axios';
import apiKeys from '../apiKeys.json';

const twilioBaseUrl = apiKeys.twilioApi.baseUrl;

const sendSMS = (smsNum, message) => axios({
  method: 'post',
  url: `${twilioBaseUrl}/sms`,
  headers: {
    'Content-Type': 'application/json',
  },
  data: {
    sendNumber: smsNum,
    message,
  },
});

export default { sendSMS };
