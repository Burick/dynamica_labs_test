import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const apiRequest =  (opt = {}) => {
                return axios(opt)
                    .then(resp => {
                        return resp.data;
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            };

export default apiRequest
