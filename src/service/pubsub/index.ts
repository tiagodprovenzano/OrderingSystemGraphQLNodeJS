import PubSub from "graphql-firestore-subscriptions";
import ordersSubscriptions from '../../orders/subscriptions'

const ps = new PubSub();
const subscriptions = [
    ordersSubscriptions
];

subscriptions.map(sb => sb(ps))

export default ps;
