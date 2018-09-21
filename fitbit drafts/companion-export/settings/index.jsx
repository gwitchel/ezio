function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Fitbit Account</Text>}>
        <Oauth
          settingsKey="oauth"
          title="Login"
          label="Fitbit"
          status="Login"
          authorizeUrl="https://www.fitbit.com/oauth2/authorize"
          requestTokenUrl="https://api.fitbit.com/oauth2/token"
          clientId="22CYN7"
          clientSecret="79704fbdc453f3d2d020d0fa4218f246"
          scope="heartrate"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
