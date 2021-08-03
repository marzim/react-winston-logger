import Logger from '../utils/logger';

function SimpleCard({title}:{title?: string}){
    
    Logger.info("this is an info")
    Logger.warn('this is a warning');
    Logger.debug('this is a debug');
    Logger.error('this is an error');

    return (
        <div><h1>{title}</h1></div>
    );
}

export default SimpleCard;