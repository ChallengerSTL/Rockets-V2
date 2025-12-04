// pages/components/team/TeamNameBadge.jsx
import React, { useState } from "react";
import {
  Badge,
  useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalFooter, Button, Input, FormControl, FormLabel,
  Tooltip
} from "@chakra-ui/react";
import { useTeamName } from "../../../context/TeamNameProvider";

export default function TeamNameBadge({ variant = "subtle" }) {
  const { teamName, saveTeamName, clearTeamName } = useTeamName();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState(teamName || "");

  if (!teamName) return null;

  const open = () => {
    setValue(teamName);
    onOpen();
  };

  const handleSave = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    saveTeamName(trimmed);
    onClose();
  };

  return (
    <>
      <Tooltip label="Click to rename" hasArrow>
        <Badge
          colorScheme="green"
          variant={variant}
          fontSize="0.9rem"
          px={3}
          py={1}
          rounded="full"
          cursor="pointer"
          onClick={open}
        >
          Team: {teamName}
        </Badge>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rename Team</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Team Name</FormLabel>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter a new team name"
                maxLength={64}
                autoFocus
              />
            </FormControl>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button colorScheme="green" onClick={handleSave}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
