// // HOW TO CREATE SEEDER SCRIPT FOR MONGO

// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import data from 'data'; //import the data
// import ModelName from 'models'; //import the models
// import connectDB from 'config/db'; //import db connection

// dotenv.config();
// connectDB();

// const importData = async () => {
// 	try {
// 		await ModelName.deleteMany(); //delete any data in that collection on DB

// 		const createdDATA = await ModelName.insertMany(data); //insert the seeder data

// 		// to add eg an admin user to a product list do this
// 		const adminUser = createdDATA[0]._id;
// 		const samleProd = products.map((product) => {
// 			return { ...product, user: adminUser };
// 		});
// 		await ModelName2.inserMany(samleProd); //insers products in product model in DB
// 		process.exit();
// 	} catch (error) {
// 		console.error(error);
// 		process.exit(1);
// 	}
// };

// const destroyData = async () => {
// 	try {
// 		await ModelName.deleteMany(); //delete seeded data in that collection on DB

// 		console.log('data destroyed');
// 		process.exit();
// 	} catch (error) {
// 		console.error(error);
// 		process.exit(1);
// 	}
// };

// // to run this file node folder/seeder -d
// // to get -d, do below
// process.argv[2]

// //check if -d was called
// if(process.argv[2] === 'd'){
//     //call destroy data
//     destroyData()
// }
// else{
//     importData()
// }

// // add in package json under scripts
// "data:import": "node folder/seeder",// to import data, npm run data:import
// "data:destroy": "node folder/seeder -d" // to destroy data, npm run data:destrot
