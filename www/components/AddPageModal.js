import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Textarea
} from "@chakra-ui/core";
import { Formik, Field } from "formik";
import { useFetch } from "react-async";

export default ({ onAddPage }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { error, isPending, run } = useFetch(
    `${process.env.API_URL}/pages`,
    {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    },
    {
      onResolve: async res => {
        const newPage = await res.json();

        onAddPage(newPage);
      }
    }
  );

  return (
    <>
      <Button onClick={onOpen} mb={4}>
        Add To Profile
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add To Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ title: "" }}
              onSubmit={(values, actions) => {
                console.log("values", values);
                run({ body: JSON.stringify(values) });
              }}
              render={props => (
                <form onSubmit={props.handleSubmit}>
                  <Field
                    name="title"
                    render={({ field, form }) => (
                      <Input
                        {...field}
                        id="title"
                        placeholder="Title"
                        size="lg"
                        mb={4}
                      />
                    )}
                  />

                  <Field
                    name="content"
                    render={({ field, form }) => (
                      <Textarea
                        {...field}
                        id="content"
                        placeholder="cool story bro..."
                        size="lg"
                      />
                    )}
                  />

                  <ModalFooter>
                    <Button
                      type="submit"
                      variantColor="blue"
                      mr={3}
                      isLoading={props.isSubmitting}
                    >
                      Add
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </form>
              )}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
