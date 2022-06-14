import { useState, useRef, React, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { AppShell, Button, Center, Container, Header, List, Text, Stack, TextInput, Title, Paper, ScrollArea, MantineProvider } from '@mantine/core';

const App = () => {

  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <AppShell
        padding="md"
        header={
          <Header>
            <Center>
              <Title order={1} m="md" sx={(theme) => ({ color: theme.colors.dark[0] })}>To-Do List Maker</Title>
            </Center>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colors.dark[8],
            height: "100%"
          }
        })}
      >
        <Center style={{ height: "100%" }}>
          <Todo />
        </Center>

      </AppShell>
    </MantineProvider>
  );

};



const Todo = () => {

  const [items, setItems] = useState(["Item 1"]);
  const [inputVal, setInput] = useState("");

  const scrollableArea = useRef();

  useEffect(() => {
    scrollableArea.current.scrollTo({ top: scrollableArea.current.scrollHeight, behavior: 'smooth' });
    console.log(scrollableArea, scrollableArea.current.scrollHeight)
  }, [items]);

  const addItem = () => {
    setItems((items) => [...items, inputVal])
    console.log(inputVal);
    setInput("");
  };

  return (
    <>
      <Container style={{ width: 400, height: 1000, overflow: "hidden"}} width={400}>
        <Stack spacing={0} size={"xs"}>
          <Center>
            <Title
              order={4}
              sx={(theme) => ({ color: theme.colors.dark[0] })}
            >
              {items.length} task{items.length == 1 ? "" : "s"}
            </Title>
          </Center>

          {/* <List spacing={"sm"}>
            {items.map((item, i) => (<List.Item key={i}>{item}</List.Item>))}
          </List> */}
          <ScrollArea type='auto' style={{ height: 500, }} offsetScrollbars ref={scrollableArea}>
            {items.map((item, i) => (<Paper mt={"sm"} shadow="sm" radius="md" p="md" key={i} width={390}><Text>{item}</Text></Paper>))}
          </ScrollArea>
          <TextInput
            placeholder="New Item"
            mt={"md"}
            value={inputVal}
            onInput={(e) => setInput(e.target.value)}
            onKeyUp={(e) => e.key == "Enter" ? addItem() : null}
            rightSectionWidth={400}
          />
          <Button onClick={addItem} mt={5} fullWidth={200}>Add</Button>
        </Stack>
      </Container>
    </>
  )
};



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

