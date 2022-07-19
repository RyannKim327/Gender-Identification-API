### Gender Identification API
##### Developed by MPOP Reverse II and Callback Developers
---
#### Introduction
> I was try to register to a gender API, and I still didn't get an email from them, a reason why I do some research on how do people recognized their names, and one of this is thru their first name. I would like to thank those people who helped me a lot, specially for this project.
---
#### How to use
> I've used `NodeJs`, with `Axios` to execute this, I still don't know how to use to other language. Just use `name` as key to get the `gender` value, if ever you use the api to other languages.


``` NodeJs
const axios = require("axios");

const gender = async (name) => {
	let res = await axios.get("https://api-gender.vercel.app/?name=" + name).then((response) => {
		return response.data;
	}).catch((error) => {
		console.error("Error [Api]: " + error);
		return null;
	});
	return res;
});

module.exports = (data) => {
	
	let result = gender(data);
	console.log(result)
	
}

```
> This is the simple way to get the `gender` from our data. If you're interested to add yours from the gender's list, just let me know, and I will give you a permission.
---
#### Result
> All data are all returned as `JSON` type format.
``` JSON
{
	"name": "data",
	"gender": -1
}
```
Sample actual result
``` JSON
	"name": "Ryann Kim Sesgundo,
	"gender": 1
```
> The `name` returns as what name you inserted, while the gender is the integer value. I use different integer like using binary and negatives, here are the integer value, and its meaning.
----

| Gender | Value |
|-------------|-----------|
| 0 | `Female` |
| 1 | `Male` |
| -1 | `Unisex` |

---

#### Credits
* Callback Developers
* Mart Anthony Salazar
* Jenevem Abayom
* Elyza Cadeño
* Betty S Bayot
* Salvador
* Vercel
* Nkilm