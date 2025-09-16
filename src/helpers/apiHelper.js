import axios from 'axios'

export async function fetchData(url, method, data) {
	return await axios({
		url,
		method,
		data,
	})
		.then(res => res.data)
		.catch(err => Promise.reject(err))
}
