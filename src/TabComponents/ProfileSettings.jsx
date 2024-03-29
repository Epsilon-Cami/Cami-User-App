import React, { useEffect, useState } from 'react';
import { Divider, Paper, ThemeIcon, Image, Drawer, NavLink, rem, Badge, Center, Group, SegmentedControl, Card, Title, BackgroundImage, Alert, PinInput, NumberInput, Modal, Select, Flex, Mark, Grid, Text, TextInput, Button, PasswordInput, Box } from '@mantine/core';
import { IconLogout2, IconCreditCardOff, IconCategory, IconMail, IconDoorEnter, IconBusStop, IconMailExclamation, IconLock, IconCreditCard, IconInfoCircle } from '@tabler/icons-react'
import camicard from "/CamiCard.svg"
import camicardlogo from "/CamiCardLogo.svg"
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

function ProfileSettings() {

  const [EditProfileModalOpened, { open: openEditProfileModal, close: closeEditProfileModal }] = useDisclosure(false);
  const [paymentModalOpened, { open: openPaymentModal, close: closePaymentModal }] = useDisclosure(false);
  const [passwordModalOpened, { open: openPasswordModal, close: closePasswordModal }] = useDisclosure(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatDateMY = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    return `${month}/${year}`;
  };

  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('studentData')) || {});

  const navigate = useNavigate();

  const handleButtonClick = () => {
    localStorage.removeItem('studentData');
    navigate('/');
  };

  useEffect(() => {
    if (!userData.full_name) {
      navigate('/');
    }
  }, [userData.full_name, navigate]);


  return (
    <div>
      <Box p={30}>
        <Title order={2}>Accounts Center</Title>

        <Grid mt={20}>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>

            <Box mb={20} >

              {userData.pass_status === 0 && (
                <Box
                  style={{
                    // backgroundImage: `url(${camicard})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    borderRadius: '15px',
                    height: '210px',
                    display: 'flex',
                    border: '1px solid',
                    borderColor: '#FFBABA',
                    borderStyle: 'dashed',
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                  }} p={30}
                >
                  <IconCreditCardOff color='red' size="1.5rem" stroke={1.5} />
                  <Box>

                    <Text ta={"center"} fw={400} size="md" color='red' >
                      Cami Card Not Activated
                    </Text>
                    <Text ta={"center"} fw={400} size="xs" color='#515151' >
                      contact your bus coordinator to activate
                    </Text>
                  </Box>

                </Box>
              )}

              {userData.pass_status === 1 && (
                <Box
                  style={{
                    backgroundImage: `url(${camicard})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    borderRadius: '15px',
                  }} p={30}
                >
                  <Flex justify="space-between">
                    <Text fw={400} style={{ letterSpacing: "3px" }} size="md" color='#515151' >{userData.register_number || '_'}</Text>
                    <Image src={camicardlogo} w={60} ></Image>
                  </Flex>

                  <Flex mt="25%" justify="space-between">
                    <div>
                      <Text color='#515151' size="xs" >Caming From</Text>
                      <Text color='#515151' fw={700} size="lg" >{userData.bus_from || '_'}</Text>
                    </div>
                    <div>
                      <Text color='#515151' size="xs" >Valid till</Text>
                      <Text color='#515151' fw={700} size="lg" >{formatDateMY(userData.pass_expires_on || '_')}</Text>
                    </div>
                  </Flex>

                </Box>)}

            </Box>

            {/* <Title order={3}>Eva Martinez</Title>
             <Text fw={500} size="md" >Information Technology</Text>
            <Text size="md" c="dimmed" >2020 - 24 Batch</Text> */}

          </Grid.Col>
        </Grid>

        <Divider my="md" />

        <Flex mt={20} pb={80} direction="column" gap={10}>

          <Title order={3}>{userData.full_name || '_'}</Title>
          <Badge color='dark' variant='light' size='lg' leftSection={<IconBusStop size="1rem" stroke={1.5} />}>{userData.bus_number}</Badge>


          <NavLink
            disabled
            label={userData.department || '_'}
            leftSection={<IconCategory size="1rem" stroke={1.5} />}
          />

          <NavLink
            disabled
            label={userData.admission_year || '_'}
            leftSection={<IconDoorEnter size="1rem" stroke={1.5} />}
          />


          <NavLink
            disabled
            label={userData.email_id || '_'}
            leftSection={<IconMail size="1rem" stroke={1.5} />}
          />



          {/* <NavLink
            label="Change Email Address"
            leftSection={<IconMailExclamation size="1rem" stroke={1.5} />}
            onClick={openEditProfileModal}
          />

          <NavLink
            label="Change Password"
            leftSection={<IconLock size="1rem" stroke={1.5} />}
            onClick={openPasswordModal}
          /> */}

          <NavLink
            label="Payment Details"
            leftSection={<IconCreditCard size="1rem" stroke={1.5} />}
            onClick={openPaymentModal}
          />

          <NavLink
            label="About"
            leftSection={<IconInfoCircle size="1rem" stroke={1.5} />}
          />

          <NavLink
            label="Log out"
            style={{ color: 'red' }}
            leftSection={<IconLogout2 size="1rem" stroke={1.5} />}
            onClick={handleButtonClick}
          />

        </Flex>
      </Box>

      {/* Modal for Edit Profile */}

      <Modal size="xs" centered opened={EditProfileModalOpened} onClose={closeEditProfileModal} withCloseButton={false} zIndex={2001} >
        <Title order={3}>Change Email Address</Title>
        <TextInput
          mt={10}
          label="New Email Address"
          placeholder=""
          type='email'
        />
        <PasswordInput
          mt={10}
          label="Password"
          placeholder=""
        />
        <Button mt={20} color='blue' radius="md" size='md' fullWidth > Change Email  </Button>
      </Modal>

      {/* Modal for Payment Details */}

      <Modal size="xs" centered opened={paymentModalOpened} onClose={closePaymentModal} withCloseButton={false} zIndex={2001} >
        <Title order={3}>Paid ₹{userData.amount_paid}</Title>
        <Text fw={500} size="xs" >on {formatDate(userData.paid_on || '_')}</Text>
        <Text fw={400} size="md" mt={10} c="gray" >Valid till {formatDate(userData.pass_expires_on || '_')}</Text>
      </Modal>

      {/* Modal for Change Password */}

      <Modal size="xs" centered opened={passwordModalOpened} onClose={closePasswordModal} withCloseButton={false} zIndex={2001} >
        <Title order={3}>Change Password</Title>
        <PasswordInput
          mt={10}
          label="Current Password"
          placeholder=""
        />
        <PasswordInput
          mt={10}
          label="New Password"
          placeholder=""
        />
        <PasswordInput
          mt={10}
          label="Confirm Password"
          placeholder=""
        />
        <Button mt={20} color='blue' radius="md" size='md' fullWidth > Change Password  </Button>
      </Modal>

    </div>
  )
}

export default ProfileSettings