# AppleStockBasicVisualizer

##Getting Started
1. fork the repo
2. clone the repo
3. cd into project
4. run mongod in terminal
5. install python if you don't have it
5. dump csv into a mongoDB (see my blog post at https://jbobron.ghost.io/csv-file-import-to-mongodb/)
  - in new terminal window, run `mongoimport -d appleStockData -c stocks --type AAPLstock.csv -headerline`
5. in new terminal window run 'python app.py`
6. in browser, go to `http://localhost:5000/`

