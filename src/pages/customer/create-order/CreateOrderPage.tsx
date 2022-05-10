import React, { useState } from 'react';
import { MainLayout } from '../../../layouts/MainLayout';
import { Button, Steps, message } from 'antd';
import './CreateOrdersPage.css';
import CreateCargoForm, { Cargo } from './components/CreateCargoForm';
import CreateLocationForm from './components/CreateLocationForm';
import { GeoLocation } from '../../orders/management/models/location.interface';
import OrderConfirmation from './components/OrderConfirmation';

const { Step } = Steps;

const steps = [
  {
    id: 0,
    title: 'Create Cargos',
  },
  {
    id: 1,
    title: 'Set Locations',
  },
  {
    id: 2,
    title: 'Confirm Order',
  },
];

const CreateOrderPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [fromLocation, setFromLocation] = useState<GeoLocation>();
  const [toLocation, setToLocation] = useState<GeoLocation>();

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <MainLayout>
      <Steps style={{marginBottom: '40px'}} current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {
        currentStep === 0 &&
        <CreateCargoForm cargos={cargos}
                         setCargos={(cargos) => setCargos(cargos)}
                         next={nextStep} />
      }
      {
        currentStep === 1 && <CreateLocationForm next={nextStep}
                                                 fromLocation={fromLocation}
                                                 toLocation={toLocation}
                                                 setFromLocation={setFromLocation}
                                                 setToLocation={setToLocation}
        />
      }
      {
        currentStep === 2 && <OrderConfirmation cargos={cargos} toLocation={toLocation} fromLocation={fromLocation}/>
      }
      <div>
        {currentStep === steps.length - 1 && (
          <Button style={{display: 'flex', margin: '20px 0 '}} type='primary' onClick={() => message.success('Processing complete!')}>
            Proceed
          </Button>
        )}
        {currentStep > 0 && (
          <Button onClick={() => prevStep()}>
            Previous
          </Button>
        )}
      </div>
    </MainLayout>
  );
};

export default CreateOrderPage;