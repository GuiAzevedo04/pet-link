package com.petlink.data.dto;

import lombok.Data;

@Data
public class ServiceResponseDTO {
    private Long idService;
    private String clientName;
    private String serviceDescription;
    private Float price;
}
