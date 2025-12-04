// components/team/TeamNamePrompt.jsx
import React, { useEffect, useState } from "react";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, Input, FormControl, FormLabel, useDisclosure, Text
} from "@chakra-ui/react";
import { useTeamName } from "../../../context/TeamNameProvider";

function randomSuggestion() {
  const animals = ["Falcons", "Tigers", "Wolves", "Lions", "Hawks", "Panthers"];
  const places = ["North", "East", "West", "South", "Central"];
  return `${places[Math.floor(Math.random()*places.length)]} ${animals[Math.floor(Math.random()*animals.length)]}`;
}

export default function TeamNamePrompt() {
  const { teamName, saveTeamName } = useTeamName();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!teamName) {
      setValue(randomSuggestion());
      onOpen();
    }
  }, [teamName, onOpen]);

  const handleSave = () => {
    if (!value.trim()) return;
    saveTeamName(value.trim());
    onClose();
  };

  // If already named, render nothing
  if (teamName) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choose your Team Name</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Team Name</FormLabel>
            <Input
              placeholder="e.g., The Innovators"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              maxLength={64}
            />
            <Text mt={2} fontSize="sm" color="gray.500">
              This name will show on your cart and teacher view.
            </Text>
          </FormControl>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="outline" onClick={() => setValue(randomSuggestion())}>
            Suggest
          </Button>
          <Button colorScheme="green" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
