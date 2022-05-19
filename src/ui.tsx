import {
  Banner,
  Button,
  Container,
  Divider,
  Inline,
  IconMegaphone32,
  render,
  Stack,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";

import { h } from 'preact'
import { useCallback, useState } from "preact/hooks";

import { CreatePageHandler } from "./types";

function Plugin() {
  const handlePageButtonClick = useCallback(function () {
    emit<CreatePageHandler>("CREATE_PAGES");
  }, []);

  return (
    <Container style="padding: 0">
      <Banner icon={<IconMegaphone32 />}>
      Welcome to the Design Toolkit plugin
    </Banner>
      <Container>
        <VerticalSpace space="large" />
        <Text bold>Automations</Text>
        <VerticalSpace space="medium" />
        <Button fullWidth onClick={handlePageButtonClick}>
          Setup design document
        </Button>
        <VerticalSpace space="large" />
      </Container>
      <Divider />
      <Container>
        <VerticalSpace space="large" />
        <Stack space="extraLarge">
          <Stack space="medium">
            <Text bold>Documentation</Text>
            <Inline space="medium">
              <Text>
                <a href="https://github.com/NoWorries/toolkit-figma-plugin" target="_blank">
                  🌐 Storybook
                </a>
              </Text>
              <Text>
                <a
                  href="https://github.com/NoWorries/toolkit-figma-plugin"
                  target="_blank"
                >
                  🌐 Documentation
                </a>
              </Text>
            </Inline>
          </Stack>
          <Stack space="medium">
            <Text bold>Design Support</Text>
            <Inline space="medium">
              <Text>
                <a
                  href="https://github.com/NoWorries/toolkit-figma-plugin"
                  target="_blank"
                >
                  🌐 Social channel
                </a>
              </Text>
              <Text>
                <a
                  href="https://github.com/NoWorries/toolkit-figma-plugin"
                  target="_blank"
                >
                  🌐 Jira
                </a>
              </Text>
            </Inline>
          </Stack>{" "}
        </Stack>
      </Container>
    </Container>
  );
}

export default render(Plugin);
