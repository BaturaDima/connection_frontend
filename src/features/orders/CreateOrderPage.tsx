import React, { useState, VFC } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button, message, Steps } from 'antd';
import './CreateOrdersPage.css';
import CreateCargoForm from './CreateCargoForm';
import CreateLocationForm from './CreateLocationForm';
import { GeoLocation } from './models/location.interface';
import OrderConfirmation from './OrderConfirmation';
import { Loading } from '../shared/loading';
import NetworkErrorResult from '../shared/network-error-result/NetworkErrorResult';
import {
  useGetCitiesQuery,
  useGetStreetsQuery,
} from '../locations/locationsSlice';
import { useCreateOrderMutation } from './ordersSlice';
import { CreateOrderDto } from './models/create-order-dto.interface';
import { openNotification } from '../util/notification';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Cargo } from './models/cargo.interface';

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

const CreateOrderPage: VFC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [fromLocation, setFromLocation] = useState<GeoLocation>();
  const [toLocation, setToLocation] = useState<GeoLocation>();

  const {
    data: streets = [],
    isLoading: streetsLoading,
    isError: streetsError,
  } = useGetStreetsQuery();
  const {
    data: cities = [],
    isLoading: citiesLoading,
    isError: citiesError,
  } = useGetCitiesQuery();
  const [createOrder, { isLoading: isAdding }] = useCreateOrderMutation();

  if (streetsLoading || citiesLoading || isAdding) return <Loading />;

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
    const body: CreateOrderDto = {
      userId: 1,
      toLocation: {
        home: toLocation!.home,
        street:
          streets.find(
            (streetFromDb) => streetFromDb.name === toLocation!.street.name,
          ) ?? toLocation!.street,
        city:
          cities.find(
            (streetFromDb) => streetFromDb.name === toLocation!.city.name,
          ) ?? toLocation!.city,
      },
      fromLocation: {
        home: fromLocation!.home,
        street:
          streets.find(
            (streetFromDb) => streetFromDb.name === fromLocation?.street.name,
          ) ?? fromLocation!.street,
        city:
          cities.find(
            (streetFromDb) => streetFromDb.name === fromLocation?.city.name,
          ) ?? fromLocation!.city,
      },
      cargos,
    };

    try {
      await createOrder(body).unwrap();
      openNotification(
        'Order Creation',
        'Created successfully!',
        <CheckCircleOutlined />,
      );
      setCargos([]);
      setToLocation(undefined);
      setFromLocation(undefined);
      setCurrentStep(0);
    } catch (e) {
      message.error('Order creation failed.');
    }
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
