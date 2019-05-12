import { Mongo } from 'meteor/mongo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const ServicesCollection = new Mongo.Collection('services');

//TODO: adicionar company_id

export const ServicesTypeDefs = `
type Query {
    services: [Service]
    service(id: String): Service
}

type Mutation {
    createService(service: ServiceInput): Service
    editService(service: ServiceInput): Boolean
}

input ServiceInput {
    name: String
    duration: Float
}

type Service {
    _id: ID!
    name: String
    duration: Float
}

`;

export const ServicesResolver = {
    Query: {
        async services() {
            return ServicesCollection.find().fetch();
        },
        async service(root, args, { id }) {
            return ServicesCollection.find(id);
        },
    },

    Mutation: {
        async createService(root, {service}) {
            console.log('creating service from resolver');
            console.log({service});
            return ServicesCollection.insert(service);
        },

        async editService(root, { service }, { id }) {
            return ServicesCollection.update({ _id: id }, { $set: { ...service } });
        },

    },

};

export const createServiceMutation = graphql(
    gql`
    mutation createService($service: ServiceInput) {
        createService(service: $service) {
            _id
            name
            duration
        }
    }
  `,
    { name: 'createService' }
);



export const editServiceMutation = graphql(
    gql`
      mutation editService($service: ServiceInput!) {
        editService(service: $service)
      }
    `,
    { name: 'editService' }
);

const SERVICES_QUERY = gql`
    query Service {
      service {
        _id
        name
        duration
      }
    }
  `;

export const servicesQuery = graphql(SERVICES_QUERY, {
    name: 'serviceData',
    options: {
        fetchPolicy: 'cache-and-network',
    },
    props: data => {
        console.log({ service: data });
        return data;
    },
});



const SERVICE_GROUP = gql`
  query service($id: String!) {
    service(id: $id) {
      _id
      name
      duration
    }
  }
`;