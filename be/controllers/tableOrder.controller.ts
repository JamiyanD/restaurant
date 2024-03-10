import TableModel from "../models/tableOrder.models";
import { Request,Response } from "express";

export const getTableOrders = async (req: Request, res : Response) => {
  
    const page : number = Number(req.query.page)
    
    const moviesPerPage : number = Number(req.query.moviesPerPage)
    try{    
        const Orders = await TableModel.find()
        // .limit(20)
        // .skip(moviesPerPage * page)
        res.status(200).json(Orders)
    } catch(error){
        res.status(404).json({status : "error",data : []})
    }
}

export const addTableOrders = async (req: Request, res : Response) => {
    const body = req.body;
    console.log("==============",body)
        const insertTableOrder = new TableModel(body);
        const result = await insertTableOrder.save();
        res.json(result)
  
 }


export const deleteTableOrders = async (req: Request, res : Response) => {
    const {orderId, table_number, table_date, table_time} = req.body;
    if(orderId){
    const deleteOrder = await TableModel.findOneAndDelete({ _id: orderId });
    const result = await TableModel.find({});
    res.json(result);
    }else{
        const deleteOrder = await TableModel.findOneAndDelete({ table_number: table_number, table_date:table_date, table_time:table_time});
        res.json(deleteOrder)
    }
}

export const putTableOrders = async (req: Request, res : Response) => {
    const body = req.body;
    console.log("sda",body.id);
    const findOrder = await TableModel.findById( body.id);
    console.log(findOrder);
    res.json(findOrder);
}

export const updateTableOrders = async (req: Request, res : Response) => {
    const { _id,  table_number,
    table_email,
    table_date,
    table_time,
    table_people } =
    req.body;
    const editOrder = await TableModel.updateOne(
        { _id: _id },
        {
          $set: {
            table_number: table_number,
            table_email: table_email,
            table_date: table_date,
            table_time: table_time,
            table_people: table_people
          },
        }
      );
      console.log(editOrder);
      const result = await TableModel.find({});
      res.json(result);
  
 }

 export const filterTableOrders = async (req: Request, res : Response) => {
    const body = req.body;
    const {
        table_date,
        table_time,
        table_people } =
        req.body;
    console.log(body)
    if(table_people >= 1 && table_people <= 4){
        const filterOrder = await TableModel.find({table_date : table_date,table_time : table_time, table_people : {$gte : "1", $lte : "4"}})
        // console.log(filterOrder)
        const filterOrderOffline = await TableModel.find({table_status : 'offline'})
      filterOrderOffline.map((p) => {
        if(Number(p.table_number) >= 1 && Number(p.table_number) <= 5 ){
        filterOrder.push(p)
        }else if(Number(p.table_number) == 10 && Number(p.table_number) == 11){
            filterOrder.push(p)
        }
       })
       console.log(filterOrder)
        res.json(filterOrder)
    }else if(table_people >= 5 && table_people <= 7){
        const filterOrder = await TableModel.find({table_date : table_date,table_time : table_time, table_people : {$gte : "5", $lte : "7"}})
        const filterOrderOffline = await TableModel.find({table_status : 'offline'})
        filterOrderOffline.map((p) => {
            if(Number(p.table_number) >= 6 && Number(p.table_number) <= 9 ){
                filterOrder.push(p)
                }
         })
        res.json(filterOrder)
    }else {
        const filterOrder = await TableModel.find({table_date : table_date,table_time : table_time, table_people : {$gte : "8", $lte : "10"}})
        const filterOrderOffline = await TableModel.find({table_status : 'offline'})
        filterOrderOffline.map((p) => {
            if(Number(p.table_number) >= 12 && Number(p.table_number) <= 13 ){
                filterOrder.push(p)
                }
         })
        res.json(filterOrder)
    }
   
   
        // const insertTableOrder = new TableModel(body);
        // const result = await insertTableOrder.save();
       
  
 }