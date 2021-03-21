package com.gmail.filimon24.adelin.ticketsellingsystem.persistence;

import com.gmail.filimon24.adelin.ticketsellingsystem.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {
}
