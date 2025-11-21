package com.todoapp.backend.service;

import com.todoapp.backend.model.TeamMember;
import com.todoapp.backend.repository.TeamMemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    private final TeamMemberRepository teamMemberRepository;

    public TeamService(TeamMemberRepository teamMemberRepository) {
        this.teamMemberRepository = teamMemberRepository;
    }

    public List<TeamMember> getAllTeamMembers() {
        return teamMemberRepository.findAll();
    }

    public TeamMember createTeamMember(String name, String email, String phone, String role) {
        TeamMember member = new TeamMember();
        member.setName(name);
        member.setEmail(email);
        member.setPhone(phone);
        member.setRole(role);
        member.setAvatar("https://randomuser.me/api/portraits/men/" + 
                         (int)(Math.random() * 100) + ".jpg");
        
        return teamMemberRepository.save(member);
    }

    public TeamMember updateTeamMember(Long id, TeamController.TeamMemberRequest request) {
        Optional<TeamMember> memberOpt = teamMemberRepository.findById(id);
        if (memberOpt.isEmpty()) {
            throw new RuntimeException("Team member not found");
        }

        TeamMember member = memberOpt.get();
        member.setName(request.getName());
        member.setEmail(request.getEmail());
        member.setPhone(request.getPhone());
        member.setRole(request.getRole());

        return teamMemberRepository.save(member);
    }

    public void deleteTeamMember(Long id) {
        if (!teamMemberRepository.existsById(id)) {
            throw new RuntimeException("Team member not found");
        }
        teamMemberRepository.deleteById(id);
    }

    public List<TeamMember> searchTeamMembers(String query) {
        return teamMemberRepository.findByNameContainingIgnoreCase(query);
    }
}
