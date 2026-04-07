import { GraphQLError } from "graphql";
import Employee from "../models/Employee.js";
import cloudinary from "../config/cloudinary.js";

export const employeeResolvers = {
    Query: {
        getEmployees: async () => {
        return await Employee.find({});
    },

    searchEmployeeById: async (_, { eid }) => {
        const emp = await Employee.findById(eid);
        if (!emp) throw new GraphQLError("Employee not found", { extensions: { code: 'NOT_FOUND' } });
        return emp;
    },

  },

  Mutation: {
    addEmployee: async (_, args, context) => {
        // Check JWT
        if (!context.user) throw new GraphQLError("Not Authorized");

        try {
            const imageString = args.employee_photo.replace(/^data:image\/\w+;base64,/, "");
            const uploadResponse = await cloudinary.uploader.upload(`data:image/jpeg;base64,${imageString}`, {});

            if (args.salary < 1000) {
                throw new GraphQLError("Error: Salary must be a minimum $1000")
            }

            const newEmp = new Employee({
                ...args,
                employee_photo: uploadResponse.secure_url
            });

            return await newEmp.save();
        } catch (error) {
            throw new Error("Error: " + error.message);
        }
    },

    updateEmployeeById: async (_, { eid, salary, designation }, context) => {
        if (!context.user) throw new GraphQLError("Not Authorized");
        
        const updatedEmployee = await Employee.findByIdAndUpdate(
            eid,
            { $set: { salary, designation } },
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) throw new Error("Employee not found");
        return updatedEmployee;
    },

    deleteEmployeeById: async (_, { eid }, context) => {
        if (!context.user) throw new GraphQLError("Not Authorized");
        
        const deleted = await Employee.findByIdAndDelete(eid);
        if (!deleted) throw new GraphQLError("Delete failed");
        return "Employee deleted successfully";
    }
  }
}
