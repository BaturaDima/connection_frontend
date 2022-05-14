import React, { useState } from 'react';
import { MainLayout } from '../../../features/layouts/MainLayout';
import { Button, message, Steps } from 'antd';
import './CreateOrdersPage.css';
import CreateCargoForm, { Cargo } from './components/CreateCargoForm';
import CreateLocationForm from './components/CreateLocationForm';
import { GeoLocation } from '../../orders/management/models/location.interface';
import OrderConfirmation from './components/OrderConfirmation';
import useFetching from '../../../hooks/useFetch';
import { Street } from '../../orders/management/models/street.interface';
import { City } from '../../orders/management/models/city.interface';
import { Loading } from '../../../components/loading';
import NetworkErrorResult from '../../../components/network-error-result/NetworkErrorResult';

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

  const {
    data: streets,
    isLoading: streetsLoading,
    hasError: streetsError,
  } = useFetching<Street[]>('/location/streets', []);
  const {
    data: cities,
    isLoading: citiesLoading,
    hasError: citiesError,
  } = useFetching<City[]>('/location/cities', []);

  if (streetsLoading || citiesLoading) return <Loading />;

  if (streetsError || citiesError)
    return (
      <MainLayout>
        <NetworkErrorResult />
      </MainLayout>
    );

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onProceed = async () => {
    const body = {
      userId: 1,
      toLocation: {
        ...toLocation,
        street:
          streets.find(
            (streetFromDb) => streetFromDb.name === toLocation?.street.name,
          ) ?? toLocation?.street,
        city:
          cities.find(
            (streetFromDb) => streetFromDb.name === toLocation?.city.name,
          ) ?? toLocation?.city,
      },
      fromLocation: {
        ...fromLocation,
        street:
          streets.find(
            (streetFromDb) => streetFromDb.name === fromLocation?.street.name,
          ) ?? fromLocation?.street,
        city:
          cities.find(
            (streetFromDb) => streetFromDb.name === fromLocation?.city.name,
          ) ?? fromLocation?.city,
      },
      cargos,
    };

    const response = await fetch('/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      message.error('Order creation failed.');
      return;
    }

    message.success('Order successfully created');
    setCargos([]);
    setToLocation(undefined);
    setFromLocation(undefined);
    setCurrentStep(0);
  };

  return (
    <MainLayout>
      <Steps style={{ marginBottom: '40px' }} current={currentStep}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {currentStep === 0 && (
        <CreateCargoForm
          cargos={cargos}
          setCargos={(cargos) => setCargos(cargos)}
          next={nextStep}
        />
      )}
      {currentStep === 1 && (
        <CreateLocationForm
          cities={cities}
          streets={streets}
          next={nextStep}
          fromLocation={fromLocation}
          toLocation={toLocation}
          setFromLocation={setFromLocation}
          setToLocation={setToLocation}
        />
      )}
      {currentStep === 2 && (
        <OrderConfirmation
          cargos={cargos}
          toLocation={toLocation}
          fromLocation={fromLocation}
        />
      )}
      <div>
        {currentStep === steps.length - 1 && (
          <Button
            style={{ display: 'flex', margin: '20px 0 ' }}
            type="primary"
            onClick={onProceed}
          >
            Proceed
          </Button>
        )}
        {currentStep > 0 && (
          <Button onClick={() => prevStep()}>Previous</Button>
        )}
      </div>
    </MainLayout>
  );
};

export default CreateOrderPage;
