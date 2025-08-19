import moment from 'moment';

export const formatDate = (date)=>{
    return `created on ${moment(date).format("DD MMM YYYY, HH:mm")}`;
}