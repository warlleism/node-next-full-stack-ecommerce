import './style.scss';

const LoadingComponent = () => (
  <div className='container-detail-loading'>
    <div className="lds-roller">
      {Array.from({ length: 8 }).map((_, index) => <div key={index}></div>)}
    </div>
  </div>
);

export default LoadingComponent;
