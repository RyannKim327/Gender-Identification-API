const express = require("express")
const fs = require("fs")
const sha = require("js-sha256")
const app = express()

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
	
	let json = JSON.parse(fs.readFileSync("names.json", "utf-8"))
	
	if(req.query.entry != undefined){
		/*
		* -1 For Unisex
		* 0 For Female
		* 1 For Male
		*/
		if(req.query.key == undefined){
			let m = {
				"name": "You don't have any permission for this feature",
				"gender": -1
			}
			res.send(JSON.stringify(m))
		}else{
			let key = req.query.key
			let hash = sha.sha256(key)
			let data = "f980536d6648588885511e9090791bdd237465591245e84cf39e26b6f049e287"
			if(hash == data){
				let gender = -1
				let name = req.query.entry.toLowerCase().split(" ")
				if(req.query.gender == undefined){
					gender = -1
				}else{
					let g = req.query.gender[0]
					switch(g){
						case "m":
						case "b":
						case "1":
							gender = 1
						break
						case "f":
						case "g":
						case "0":
							gender = 0
						break
						default:
							gender = -1
					}
				}
				let message = {
					"name": name.join(" ") + " Succesfully Added",
					"gender": gender
				}
				json[name[0]] = gender
				fs.writeFileSync("names.json", JSON.stringify(json), "utf-8")
				res.send(JSON.stringify(message))
			}else{
				let m = {
					"name": "You don't have any permission for this feature",
					"gender": -1
				}
				res.send(JSON.stringify(m))
			}
		}
	}else if(req.query.name != undefined){
		let name = req.query.name.toLowerCase().split(" ")
		if(json[name[0]] == undefined){
			let m = {
				"name": name.join(" "),
				"gender": "-1"
			}
			if(m.gender < 0) {
				if(json[name[1]] == undefined){
					m.gender = -1
				}else{
					m.gender = json[name[1]]
				}
			}
			res.send(JSON.stringify(m))
		}else{
			let m = {
				"name": name.join(" "),
				"gender": json[name[0]]
			}
			if(m.gender < 0) {
				if(json[name[1]] == undefined){
					m.gender = -1
				}else{
					m.gender = json[name[1]]
				}
			}
			res.send(JSON.stringify(m))
		}
	}else{
		let m = {
			"name": "Please read the documentation",
			"gender": undefined
		}
		res.send(JSON.stringify(m))
	}
})

app.get("/data", (req, res) => {
	if(req.query.key == undefined){
		res.send("Sorry")
	}else{
		let json = JSON.parse(fs.readFileSync("names.json", "utf-8"))
		let data = req.query.key
		let hash = sha.sha256(data)
		let key = "8349c112e6b9b83a9296d60d1f7783551ebe7941c2ddab7597ccd727f338bf81"
		if(key == hash){
			res.send(JSON.stringify(json))
		}else{
			res.send("Sorry")
		}
	}
})

app.get("/hash", (req, res) => {
	let a = req.query.s
	let b = sha.sha256(a)
	res.send(b)
})

app.listen(port, () => {
	console.log("Listening") 
})

module.exports = app
