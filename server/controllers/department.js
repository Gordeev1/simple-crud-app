import { Department } from '../models';
import { LIMITS } from '../constants';
import Joi from 'joi';

const get = {
    handler: (request, reply) => {

        const { id } = request.params;
        const { skip } = request.query;

        if (id) {
            return Department.findById(id).lean().exec((error, department) => {
                
                const response = error
                    ? Boom.badImplementation(err) 
                    : !department
                    ? Boom.notFound()
                    : department;

                return reply(response);
            })
        }

        return Department.find({}, null, {
            sort: '-createdAt',
            limit: LIMITS.department,
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
			name: Joi.string().required(),
		}
    },
    handler: (request, reply) => {
        
        const { payload } = request;
        
        const department = new Department(payload);
        return department.save((error, data) => {

            const response = error
                ? Boom.badImplementation(error)
                : data

            return reply(response);
        })

    }
}

const update = {
     validate: {
        payload: {
			name: Joi.string().required()
        }
    },
    handler: (request, reply) => {

        const { payload } = request;
        const { id } = request.params;

        return Department.findByIdAndUpdate(id, payload).lean().exec((error, department) => {

            const response = error
                ? Boom.badImplementation(error)
                : department

            return reply(response);
        })
    }
}

const remove = {
    handler: (request, reply) => {

        const { id } = request.params;

        return Department.findByIdAndRemove(id, error => {

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