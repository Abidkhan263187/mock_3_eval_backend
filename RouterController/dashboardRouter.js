const { Router } = require('express');
const { empModel } = require('../Models/employeeModel');

const dashBoardRouter = Router();



dashBoardRouter.get('/', async (req, res) => {
    const { sortby, order, page, limit, s } = req.query

    const currPage = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 5;
    const skip = (currPage - 1) * pageSize;


    try {
        let employees;
        if (s) {
            const empSearch = new RegExp(s, 'i');
            employees = await empModel.find({ firstName: empSearch }).limit(parseInt(limit))
        }
        else if (sortby && order) {
            const sorting = order === 'asc' ? 1 : -1;
            employees = await empModel.find().sort({ [sortby]: sorting }).limit(parseInt(limit))

        } else if (limit) {
            employees = await empModel.find().skip(skip).limit(parseInt(limit));
        }
        else { employees = await empModel.find(req.query) }

        res.send({ employees });
    } catch (error) {
        res.status(500).json({ mssg: "error while getting employee data" })
        console.log("error while getting employee data");
    }
})

dashBoardRouter.post('/', async (req, res) => {
    try {
        const employee = empModel(req.body)
        await employee.save();
        res.status(200).json({ mssg: "employee data created successfully", employee })
    } catch (error) {
        res.status(500).json({ mssg: "error creating employee", error })
        console.log("error creating employee", error)
    }

})


dashBoardRouter.patch('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const update = await empModel.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).send({ mssg: "successfully updated" });
    } catch (error) {
        console.log("error while updating employees");
        console.log(error);
        res.status(500).send({ mssg: "error while updating employees", error });
    }
})

dashBoardRouter.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deleted = await empModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ mssg: "successfully deleted" });
    } catch (error) {
        console.log("error while deleting employees");
        console.log(error);
        res.status(500).send({ mssg: "error while deleting employees", error });
    }
})


module.exports = { dashBoardRouter }