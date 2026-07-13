package com.practice;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class FileServiceTest {

    @Test
    void testServiceWithMockFileIO() {

        // Arrange
        FileReader mockReader = mock(FileReader.class);
        FileWriter mockWriter = mock(FileWriter.class);

        when(mockReader.read())
                .thenReturn("Mock File Content");

        FileService fileService =
                new FileService(mockReader, mockWriter);

        // Act
        String result = fileService.processFile();

        // Assert
        assertEquals("Processed Mock File Content", result);

        verify(mockReader).read();

        verify(mockWriter)
                .write("Processed Mock File Content");
    }
}