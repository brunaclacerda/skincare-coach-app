import {
  Text,
  Box,
  HStack,
  Collapse,
  Alert,
  IconButton,
  CloseIcon,
} from "native-base";

export default function ErrorStatus({ show, setShow, error }) {
  return (
    <Box pt={5} w="100%" alignItems="center" safeArea>
      <Collapse isOpen={show}>
        <Alert maxW="400" status="error">
          <HStack space={1} alignItems="center" justifyContent="space-between">
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon />
              <Text
                fontSize="md"
                fontWeight="medium"
                textAlign="center"
                _dark={{
                  color: "coolGray.800",
                }}
              >
                {error}
              </Text>
            </HStack>
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
              icon={<CloseIcon size="3" />}
              _icon={{
                color: "coolGray.600",
              }}
              onPress={() => setShow(false)}
            />
          </HStack>
        </Alert>
      </Collapse>
    </Box>
  );
}
