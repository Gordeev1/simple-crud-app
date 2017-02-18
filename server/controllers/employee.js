import { Employee } from '../models';
import { LIMITS } from '../constants';
import Joi from 'joi';

const get = {
    handler: (request, reply) => {

        const { id } = request.params;
        const { skip } = request.query;

        if (id) {
            return Employee.findById(id).lean().exec((error, employee) => {
                
                const response = error
                    ? Boom.badImplementation(err) 
                    : !employee
                    ? Boom.notFound()
                    : employee;

                return reply(response);
            })
        }

        return Employee.find({}, null, {
            sort: '-createdAt',
            limit: LIMITS.employee,
            skip: parseInt(skip || 0)
        })
        .lean()
        .exec((error, data) => {

            const response = error
                ? Boom.badImplementation(error)
                : data

            return reply(response);
        })
    }
}

const post = {
    validate: {
        payload: {
			firstName: Joi.string().required(),
			lastName: Joi.string().required(),
            department: Joi.string().required()
		}
    },
    handler: (request, reply) => {
        
        const { payload } = request;
        
        const employee = new Employee(payload);
        return employee.save((error, data) => {

            const response = error
                ? Boom.badImplementation(error)
                : data

            return reply(response);
        })

    }
}

const update = {
     validate: {
        payload: Joi.object().keys({
			firstName: Joi.string().optional(),
			lastName: Joi.string().optional(),
            department: Joi.string().optional()
		}).min(1)
    },
    handler: (request, reply) => {

        const { payload } = request;
        const { id } = request.params;

        return Employee.findByIdAndUpdate(id, payload).lean().exec((error, employee) => {

            const response = error
                ? Boom.badImplementation(error)
                : employee

            return reply(response);
        })
    }
}

const remove = {
    handler: (request, reply) => {

        const { id } = request.params;

        return Employee.findByIdAndRemove(id, error => {

            const response = error
                ? Boom.badImplementation(error)
                : { id }

            return reply(response);
        })

    }
}

export default {
    get, post, update, remove
}