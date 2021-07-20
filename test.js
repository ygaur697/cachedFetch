const fetch = require('node-fetch');
const urlCachedData  = {}
let count = 0
const ongoingRequests = []


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

function  cachedFetch(url){
    return new Promise(async (resolve, reject) => {        
        if(!(map.hasOwnProperty(url)) ){
            if(!ongoingRequests.includes(url))
            {
                ongoingRequests.push(url)  
                fetch(url, {
                    method: 'GET',       
                })
                .then(res => res.json())
                .then(json => {
                    map[url] = json
                    ongoingRequests.splice(ongoingRequests.indexOf(url), 1)                  
                    return resolve(json)       
                })
                .catch(err => {
                    console.log(err)
                    return reject(err)
                });
            }else {
                while(true) {
                    // Here we can write logic for requests that are taking too long and decide further choices
                    // ( How much time we want to wait and if we want to reject it after certain number of tries  )
                    await sleep(2000)
                        if(map[url]){
                            return resolve(map[url])
                }
            }
        }
            count++
            console.log("I was called " +count +" times")
            
                
        }   
    })

}
cachedFetch(`https://httpbin.org/get`).then( r => console.log("Done"))
cachedFetch(`https://httpbin.org/get`).then( r => console.log("Done", map))
// cachedFetch(`https://web.whatsapp.com/`)
cachedFetch(`http://api.plos.org/search?q=title:"Drosophila" AND body:"RNA"&fl=id,abstract`).then( r => console.log("Done", map))

console.log(map)