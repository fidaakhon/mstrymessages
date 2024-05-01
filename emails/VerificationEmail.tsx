import {
    Html,
    Head,
    Body,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
} from '@react-email/components';


interface verificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({ username, otp }: verificationEmailProps) {
    return (
        <Html lang="en" dir='ltr'>
            <Head>
                <title>Verification Code</title>
                <Font 
                fontFamily='Roboto'
                fallbackFontFamily="Verdana"
                webFont={{
                    url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                    format: 'woff2',
                
                }}
                fontWeight={400}
                fontStyle='normal'
                />
            </Head>
            <Body>
                <Section>
                    <Row>
                        <Heading>Hi {username},</Heading>
                    </Row>
                    <Row>
                        <Text>
                            Your verification code is <strong>{otp}</strong>.
                        </Text>
                    </Row>
                    <Row>
                        <Text>
                            If you didn't request this code, please ignore this email.
                        </Text>
                    </Row>
                    {/* <Row>
                        <Button href="https://example.com/verify">Verify</Button>
                    </Row> */}
                </Section>
            </Body>
        </Html>
    );
}