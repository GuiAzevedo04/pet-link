package com.petlink.service;

import com.petlink.data.entity.Services;
import com.petlink.repository.ServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicesService {

    @Autowired
    private final ServicesRepository servicesRepository;

    public ServicesService(ServicesRepository servicesRepository) {
        this.servicesRepository = servicesRepository;
    }

    //GET ALL
    public List<Services> getAllServices(){
        return servicesRepository.findAll();
    }

    //GET BY ID
    public Optional<Services> getServices(Long id){
        return servicesRepository.findById(id);
    }

    //POST
    public void addServices(Services services){
        servicesRepository.save(services);
    }

    //DELETE ALL
    public void deleteAllServices(){
        servicesRepository.deleteAll();
    }

    //DELETE BY ID
    public void deleteById(Long id){
        servicesRepository.deleteById(id);
    }

    //UPDATE
    public void updateService(Services services, Long id) {
        Optional<Services> existingServices = servicesRepository.findById(id);
        if (existingServices.isPresent()) {
            Services updatedService = existingServices.get();
            updatedService.setClientName(services.getClientName());
            updatedService.setServiceDescription(services.getServiceDescription());
            updatedService.setPrice(services.getPrice());
            servicesRepository.save(updatedService);
        } else {
            throw new IllegalStateException("Schedule not found");
        }
    }

}