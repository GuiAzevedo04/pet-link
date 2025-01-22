package com.petlink.data.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "services")
public class Services {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_schedules", updatable = false, nullable = false)
    private Long idService;

    @NotBlank
    @Column(nullable = false, name = "client_name")
    private String clientName;

    @NotBlank
    @Column(nullable = false, name = "service_description")
    private String serviceDescription;

    @NotBlank
    @Column(nullable = false, name = "price")
    private Float price;

}
